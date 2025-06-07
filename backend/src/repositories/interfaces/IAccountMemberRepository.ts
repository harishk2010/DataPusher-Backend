import { IAccountMember } from "../../models/accountMemberModel";
import { IGenericRepository } from "../GenericRepository";

export interface IAccountMemberRepository extends IGenericRepository<IAccountMember> {
  findByAccountId(accountId: string): Promise<IAccountMember[]>;
  findByUserId(userId: string): Promise<IAccountMember[]>;
  findByAccountAndUser(accountId: string, userId: string): Promise<IAccountMember | null>;
  findByAccountWithDetails(accountId: string): Promise<IAccountMember[]>;
}