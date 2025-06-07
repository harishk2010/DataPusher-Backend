import { IDataHandlerService } from "../services/interfaces/IDataHandlerService";
import { IAccountService } from "../services/interfaces/IAccountService";
import { IDestinationService } from "../services/interfaces/IDestinationService";
import { ILogService } from "../services/interfaces/ILogService";
import { queueService } from "../config/queue";

export class DataHandlerService implements IDataHandlerService {
  private accountService: IAccountService;
  private destinationService: IDestinationService;
  private logService: ILogService;

  constructor(
    accountService: IAccountService,
    destinationService: IDestinationService,
    logService: ILogService
  ) {
    this.accountService = accountService;
    this.destinationService = destinationService;
    this.logService = logService;
  }

  async processIncomingData(secretToken: string, eventId: string, data: any): Promise<any> {
    try {
      const account = await this.accountService.getAccountBySecretToken(secretToken);
      if (!account) {
        throw new Error("Invalid secret token");
      }

      const existingLog = await this.logService.getLogByEventId(eventId);
      if (existingLog) {
        throw new Error("Duplicate event ID");
      }

      const destinations = await this.destinationService.getDestinationsByAccount((account._id as string).toString());
      
      if (destinations.length === 0) {
        throw new Error("No destinations configured for this account");
      }

      for (const destination of destinations) {
        await this.logService.createLog({
          event_id: `${eventId}_${destination._id}`,
          account_id: account._id,
          destination_id: destination._id,
          received_data: data,
          status: "pending"
        });
      }

      await queueService.addToQueue('webhook-processing', {
        accountId: (account._id as string).toString(),
        eventId,
        data,
        destinations: destinations.map(d => (d._id as string).toString())
      });

      return {
        success: true,
        message: "Data received and queued for processing",
        eventId
      };
    } catch (error: any) {
      throw new Error(`Failed to process incoming dataa: ${error.message}`);
    }
  }

  async forwardDataToDestinations(accountId: string, eventId: string, data: any): Promise<void> {
    const destinations = await this.destinationService.getDestinationsByAccount(accountId);
    
    for (const destination of destinations) {
      try {
        const logEventId = `${eventId}_${destination._id}`;
        
        await this.logService.updateLogStatus(logEventId, "processing");

        const response = await this.sendToDestination(destination, data);
        
        await this.logService.updateLogStatus(logEventId, "success", new Date());
        
      } catch (error: any) {
        await this.logService.updateLogStatus(`${eventId}_${destination._id}`, "failed", new Date());
        console.error(`Failed to forward data to ${destination.url}:`, error.message);
      }
    }
  }

  private async sendToDestination(destination: any, data: any): Promise<any> {
    const fetch = require('node-fetch');
    
    const headers: any = {
      'Content-Type': 'application/json'
    };

    destination.headers.forEach((header: any) => {
      headers[header.key] = header.value;
    });

    const response = await fetch(destination.url, {
      method: destination.http_method,
      headers,
      body: JSON.stringify(data),
      timeout: 30000 // 30 seconds timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json().catch(() => ({}));
  }
}
