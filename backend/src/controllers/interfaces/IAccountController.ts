import { Request, Response } from "express";

export interface IAccountController {
  createAccount(req: Request, res: Response): Promise<void>;
  getAccounts(req: Request, res: Response): Promise<void>;
  getAccountById(req: Request, res: Response): Promise<void>;
  updateAccount(req: Request, res: Response): Promise<void>;
  deleteAccount(req: Request, res: Response): Promise<void>;
  searchAccounts(req: Request, res: Response): Promise<void>;
}