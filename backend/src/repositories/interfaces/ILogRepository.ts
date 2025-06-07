import { ILog } from "../../models/logModel";
import { IGenericRepository } from "../GenericRepository";

export interface ILogRepository extends IGenericRepository<ILog> {
  findByAccountId(accountId: string, page?: number, limit?: number): Promise<ILog[]>;
  findByEventId(eventId: string): Promise<ILog | null>;
  findByStatus(status: string, accountId?: string): Promise<ILog[]>;
  findByDateRange(startDate: Date, endDate: Date, accountId?: string): Promise<ILog[]>;
  getLogStats(accountId: string): Promise<any>;
}
