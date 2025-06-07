import { Request, Response } from "express";
import { IAccountMemberService } from "../services/interfaces/IAccountMemberService";
import { IAccountMemberController } from "./interfaces/IAccountMemberController";

export class AccountMemberController implements IAccountMemberController {
  private accountMemberService: IAccountMemberService;

  constructor(accountMemberService: IAccountMemberService) {
    this.accountMemberService = accountMemberService;
  }

  async addMember(req: Request, res: Response): Promise<void> {
    try {
      const { accountId } = req.params;
      // @ts-ignore
      const adminUserId = req.user.id;
      
      const member = await this.accountMemberService.addMemberToAccount(accountId, req.body, adminUserId);
      res.status(201).json({
        success: true,
        message: "Member added successfully",
        data: member
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getMembers(req: Request, res: Response): Promise<void> {
    try {
      const { accountId } = req.params;
      const members = await this.accountMemberService.getAccountMembers(accountId);
      res.status(200).json({
        success: true,
        data: members
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateMemberRole(req: Request, res: Response): Promise<void> {
    try {
      const { accountId, userId } = req.params;
      const { roleId } = req.body;
      // @ts-ignore
      const adminUserId = req.user.id;
      
      const member = await this.accountMemberService.updateMemberRole(accountId, userId, roleId, adminUserId);
      
      if (!member) {
        res.status(404).json({
          success: false,
          message: "Member not found"
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Member role updated successfully",
        data: member
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async removeMember(req: Request, res: Response): Promise<void> {
    try {
      const { accountId, userId } = req.params;
      // @ts-ignore
      const adminUserId = req.user.id;
      
      const removed = await this.accountMemberService.removeMemberFromAccount(accountId, userId, adminUserId);
      
      if (!removed) {
        res.status(404).json({
          success: false,
          message: "Member not found"
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Member removed successfully"
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getUserAccounts(req: Request, res: Response): Promise<void> {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const accounts = await this.accountMemberService.getUserAccounts(userId);
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