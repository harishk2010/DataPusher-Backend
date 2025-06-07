import { ILogService } from "./interfaces/ILogService";
import { ILogRepository } from "../repositories/interfaces/ILogRepository";
import { ILog } from "../models/logModel";
import { Types } from "mongoose";

export class LogService implements ILogService {
  private logRepository: ILogRepository;

  constructor(logRepository: ILogRepository) {
    this.logRepository = logRepository;
  }

  async createLog(logData: any): Promise<ILog> {
    const { event_id, account_id, destination_id, received_data, status = "pending" } = logData;

    const newLog = await this.logRepository.create({
      event_id,
      account_id: new Types.ObjectId(account_id),
      destination_id: new Types.ObjectId(destination_id),
      received_timestamp: new Date(),
      received_data,
      status,
    });

    return newLog;
  }

  async getLogsByAccount(accountId: string, page: number = 1, limit: number = 50): Promise<ILog[]> {
    return await this.logRepository.findByAccountId(accountId, page, limit);
  }

  async getLogById(id: string): Promise<ILog | null> {
    return await this.logRepository.findById(id);
  }

  async getLogByEventId(eventId: string): Promise<ILog | null> {
    return await this.logRepository.findByEventId(eventId);
  }

  async getLogsByStatus(status: string, accountId?: string): Promise<ILog[]> {
    return await this.logRepository.findByStatus(status, accountId);
  }

  async getLogsByDateRange(startDate: Date, endDate: Date, accountId?: string): Promise<ILog[]> {
    return await this.logRepository.findByDateRange(startDate, endDate, accountId);
  }

  async getLogStats(accountId: string): Promise<any> {
    return await this.logRepository.getLogStats(accountId);
  }

  async updateLogStatus(eventId: string, status: string, processedTimestamp?: Date): Promise<ILog | null> {
  const log = await this.logRepository.findByEventId(eventId);
  if (!log) return null;

  const updateData: any = {
    status,
    processed_timestamp: processedTimestamp || new Date()
  };

  return await this.logRepository.update((log._id as Types.ObjectId).toString(), updateData);
}
async searchLogs(query: string, accountId: string): Promise<ILog[]> {
  return await this.logRepository.findAll({
    account_id: new Types.ObjectId(accountId),
    $or: [
      { event_id: { $regex: query, $options: 'i' } },
      { status: { $regex: query, $options: 'i' } },
      { 'received_data': { $regex: query, $options: 'i' } }
    ]
  });
}
}