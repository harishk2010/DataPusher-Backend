import mongoose from "mongoose";
import { IAccount, AccountModel } from "../models/accountModel";
import { GenericRepository } from "./GenericRepository";
import { IAccountRepository } from "./interfaces/IAccountRepository";

export class AccountRepository
  extends GenericRepository<IAccount>
  implements IAccountRepository
{
  constructor() {
    super(AccountModel);
  }

  async findByAccountId(accountId: string): Promise<IAccount | null> {
    return await this.model.findOne({ account_id: accountId });
  }

  async findBySecretToken(token: string): Promise<IAccount | null> {
    return await this.model.findOne({ app_secret_token: token });
  }

  async findByUserId(userId: string): Promise<IAccount[]> {
    return await this.model.find({ created_by: new mongoose.Types.ObjectId(userId) });
  }
}