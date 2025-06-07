import { Request, Response, NextFunction } from "express";
import { AccountMemberModel } from "../models/accountMemberModel";
import { RoleModel } from "../models/roleModel";

export function requireRole(roleName: string) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // @ts-ignore
      const userId = req.user.id;
      
      const accountMember = await AccountMemberModel.findOne({ user_id: userId })
        .populate('role_id');
      
      if (!accountMember) {
        res.status(403).json({
          success: false,
          message: "No role assigned"
        });
        return;
      }

      // @ts-ignore
      const userRole = accountMember.role_id.role_name;
      
      if (userRole !== roleName) {
        res.status(403).json({
          success: false,
          message: `${roleName} role required`
        });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Role verification failed"
      });
    }
  };
}