import { IAccountMember } from "../../models/accountMemberModel";

export interface IAccountMemberService {
  addMemberToAccount(accountId: string, userData: any, adminUserId: string): Promise<IAccountMember>;
  getAccountMembers(accountId: string): Promise<IAccountMember[]>;
  getUserAccounts(userId: string): Promise<IAccountMember[]>;
  updateMemberRole(accountId: string, userId: string, roleId: string, adminUserId: string): Promise<IAccountMember | null>;
  removeMemberFromAccount(accountId: string, userId: string, adminUserId: string): Promise<boolean>;
  checkMemberAccess(accountId: string, userId: string): Promise<IAccountMember | null>;
}