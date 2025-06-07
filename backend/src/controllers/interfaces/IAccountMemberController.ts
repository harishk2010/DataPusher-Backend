import { Request, Response } from "express";

export interface IAccountMemberController {
  addMember(req: Request, res: Response): Promise<void>;
  getMembers(req: Request, res: Response): Promise<void>;
  updateMemberRole(req: Request, res: Response): Promise<void>;
  removeMember(req: Request, res: Response): Promise<void>;
  getUserAccounts(req: Request, res: Response): Promise<void>;
}
