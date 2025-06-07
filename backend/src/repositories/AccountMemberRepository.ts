import { IAccountMember, AccountMemberModel } from "../models/accountMemberModel";
import { GenericRepository } from "./GenericRepository";
import { IAccountMemberRepository } from "./interfaces/IAccountMemberRepository";
import { Types } from "mongoose";

export class AccountMemberRepository
  extends GenericRepository<IAccountMember>
  implements IAccountMemberRepository
{
  constructor() {
    super(AccountMemberModel);
  }

  async findByAccountId(accountId: string): Promise<IAccountMember[]> {
    return await this.model.find({ account_id: new Types.ObjectId(accountId) });
  }

  async findByUserId(userId: string): Promise<IAccountMember[]> {
    return await this.model.find({ user_id: new Types.ObjectId(userId) });
  }

  async findByAccountAndUser(accountId: string, userId: string): Promise<IAccountMember | null> {
    return await this.model.findOne({ 
      account_id: new Types.ObjectId(accountId),
      user_id: new Types.ObjectId(userId)
    });
  }

  async findByAccountWithDetails(accountId: string): Promise<IAccountMember[]> {
    return await this.model
      .find({ account_id: new Types.ObjectId(accountId) })
      .populate('user_id', 'email')
      .populate('role_id', 'role_name');
  }
}
