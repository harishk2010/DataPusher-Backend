import { Request, Response } from "express";
import { ILogService } from "../services/interfaces/ILogService";
import { ILogController } from "./interfaces/ILogController";

export class LogController implements ILogController {
  private logService: ILogService;

  constructor(logService: ILogService) {
    this.logService = logService;
  }

  async getLogs(req: Request, res: Response): Promise<void> {
    try {
      const { accountId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      
      const logs = await this.logService.getLogsByAccount(accountId, page, limit);
      res.status(200).json({
        success: true,
        data: logs,
        pagination: {
          page,
          limit
        }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getLogById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const log = await this.logService.getLogById(id);
      
      if (!log) {
        res.status(404).json({
          success: false,
          message: "Log not found"
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: log
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getLogByEventId(req: Request, res: Response): Promise<void> {
    try {
      const { eventId } = req.params;
      const log = await this.logService.getLogByEventId(eventId);
      
      if (!log) {
        res.status(404).json({
          success: false,
          message: "Log not found"
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: log
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getLogsByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { accountId } = req.params;
      const { status } = req.query;
      
      if (!status) {
        res.status(400).json({
          success: false,
          message: "Status parameter is required"
        });
        return;
      }

      const logs = await this.logService.getLogsByStatus(status as string, accountId);
      res.status(200).json({
        success: true,
        data: logs
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getLogsByDateRange(req: Request, res: Response): Promise<void> {
    try {
      const { accountId } = req.params;
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        res.status(400).json({
          success: false,
          message: "Start date and end date are required"
        });
        return;
      }

      const logs = await this.logService.getLogsByDateRange(
        new Date(startDate as string),
        new Date(endDate as string),
        accountId
      );
      
      res.status(200).json({
        success: true,
        data: logs
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getLogStats(req: Request, res: Response): Promise<void> {
    try {
      const { accountId } = req.params;
      const stats = await this.logService.getLogStats(accountId);
      
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async searchLogs(req: Request, res: Response): Promise<void> {
    try {
      const { accountId } = req.params;
      const { q } = req.query;
      
      if (!q) {
        res.status(400).json({
          success: false,
          message: "Search query is required"
        });
        return;
      }

      const logs = await this.logService.searchLogs(q as string, accountId);
      res.status(200).json({
        success: true,
        data: logs
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}