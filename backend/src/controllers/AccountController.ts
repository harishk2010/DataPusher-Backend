import { Request, Response } from "express";
import { IAccountService } from "../services/interfaces/IAccountService";
import { IAccountController } from "./interfaces/IAccountController";

export class AccountController implements IAccountController {
  private accountService: IAccountService;

  constructor(accountService: IAccountService) {
    this.accountService = accountService;
  }

  async createAccount(req: Request, res: Response): Promise<void> {
    try {
      // @ts-ignore - assuming you have middleware that adds user to request
      const userId = req.user.id;
      const account = await this.accountService.createAccount(req.body, userId);
      res.status(201).json({
        success: true,
        message: "Account created successfully",
        data: account
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getAccounts(req: Request, res: Response): Promise<void> {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const accounts = await this.accountService.getAccountsByUser(userId);
      res.status(200).json({
        success: true,
        data: accounts
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getAccountById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const account = await this.accountService.getAccountById(id);
      
      if (!account) {
        res.status(404).json({
          success: false,
          message: "Account not found"
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: account
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateAccount(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      // @ts-ignore
      const userId = req.user.id;
      
      const account = await this.accountService.updateAccount(id, req.body, userId);
      
      if (!account) {
        res.status(404).json({
          success: false,
          message: "Account not found"
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Account updated successfully",
        data: account
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteAccount(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      // @ts-ignore
      const userId = req.user.id;
      
      const deleted = await this.accountService.deleteAccount(id, userId);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "Account not found"
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Account deleted successfully"
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async searchAccounts(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      // @ts-ignore
      const userId = req.user.id;
      
      if (!q) {
        res.status(400).json({
          success: false,
          message: "Search query is required"
        });
        return;
      }

      const accounts = await this.accountService.searchAccounts(q as string, userId);
      res.status(200).json({
        success: true,
        data: accounts
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}