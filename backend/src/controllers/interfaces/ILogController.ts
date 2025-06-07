import { Request, Response } from "express";

export interface ILogController {
  getLogs(req: Request, res: Response): Promise<void>;
  getLogById(req: Request, res: Response): Promise<void>;
  getLogByEventId(req: Request, res: Response): Promise<void>;
  getLogsByStatus(req: Request, res: Response): Promise<void>;
  getLogsByDateRange(req: Request, res: Response): Promise<void>;
  getLogStats(req: Request, res: Response): Promise<void>;
  searchLogs(req: Request, res: Response): Promise<void>;
}
