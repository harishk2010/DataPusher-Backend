import { ILog } from "../../models/logModel";

export interface ILogService {
  createLog(logData: any): Promise<ILog>;
  getLogsByAccount(accountId: string, page?: number, limit?: number): Promise<ILog[]>;
  getLogById(id: string): Promise<ILog | null>;
  getLogByEventId(eventId: string): Promise<ILog | null>;
  getLogsByStatus(status: string, accountId?: string): Promise<ILog[]>;
  getLogsByDateRange(startDate: Date, endDate: Date, accountId?: string): Promise<ILog[]>;
  getLogStats(accountId: string): Promise<any>;
  updateLogStatus(eventId: string, status: string, processedTimestamp?: Date): Promise<ILog | null>;
  searchLogs(query: string, accountId: string): Promise<ILog[]>;
}
