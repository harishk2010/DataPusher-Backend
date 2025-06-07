import { Request, Response } from "express";
import { IDataHandlerService } from "../services/interfaces/IDataHandlerService";
import { IDataHandlerController } from "./interfaces/IDataHandlerController";

export class DataHandlerController implements IDataHandlerController {
  private dataHandlerService: IDataHandlerService;

  constructor(dataHandlerService: IDataHandlerService) {
    this.dataHandlerService = dataHandlerService;
  }

  async handleIncomingData(req: Request, res: Response): Promise<void> {
    try {
      const secretToken = req.headers['cl-x-token'] as string;
      const eventId = req.headers['cl-x-event-id'] as string;
      console.log("first",secretToken,eventId)
      const data = req.body;

      // Validate required headers
      if (!secretToken) {
        res.status(400).json({
          success: false,
          message: "CL-X-TOKEN header is required"
        });
        return;
      }

      if (!eventId) {
        res.status(400).json({
          success: false,
          message: "CL-X-EVENT-ID header is required"
        });
        return;
      }

      // Validate JSON data
      if (!data || typeof data !== 'object') {
        res.status(400).json({
          success: false,
          message: "Invalid JSON data"
        });
        return;
      }

      const result = await this.dataHandlerService.processIncomingData(secretToken, eventId, data);
      
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}