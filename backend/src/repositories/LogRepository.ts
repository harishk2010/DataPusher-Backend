import { ILog, LogModel } from "../models/logModel";
import { GenericRepository } from "./GenericRepository";
import { ILogRepository } from "./interfaces/ILogRepository";
import { Types } from "mongoose";

export class LogRepository
  extends GenericRepository<ILog>
  implements ILogRepository
{
  constructor() {
    super(LogModel);
  }

  async findByAccountId(accountId: string, page: number = 1, limit: number = 50): Promise<ILog[]> {
    const skip = (page - 1) * limit;
    return await this.model
      .find({ account_id: new Types.ObjectId(accountId) })
      .populate('destination_id', 'url http_method')
      .sort({ received_timestamp: -1 })
      .skip(skip)
      .limit(limit);
  }

  async findByEventId(eventId: string): Promise<ILog | null> {
    return await this.model.findOne({ event_id: eventId });
  }

  async findByStatus(status: string, accountId?: string): Promise<ILog[]> {
    const query: any = { status };
    if (accountId) {
      query.account_id = new Types.ObjectId(accountId);
    }
    return await this.model.find(query).populate('destination_id', 'url http_method');
  }

  async findByDateRange(startDate: Date, endDate: Date, accountId?: string): Promise<ILog[]> {
    const query: any = {
      received_timestamp: {
        $gte: startDate,
        $lte: endDate
      }
    };
    if (accountId) {
      query.account_id = new Types.ObjectId(accountId);
    }
    return await this.model.find(query).populate('destination_id', 'url http_method');
  }

  async getLogStats(accountId: string): Promise<any> {
    const stats = await this.model.aggregate([
      { $match: { account_id: new Types.ObjectId(accountId) } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const totalLogs = await this.model.countDocuments({ account_id: new Types.ObjectId(accountId) });
    
    return {
      total: totalLogs,
      statusBreakdown: stats.reduce((acc: any, curr: any) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {})
    };
  }
}