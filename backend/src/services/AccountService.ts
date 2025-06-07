import { IAccountService } from "./interfaces/IAccountService";
import { IAccountRepository } from "../repositories/interfaces/IAccountRepository";
import { IAccount } from "../models/accountModel";
import { generateAccountId, generateSecretToken } from "../utils/generators";
import mongoose from "mongoose";

export class AccountService implements IAccountService {
  private accountRepository: IAccountRepository;

  constructor(accountRepository: IAccountRepository) {
    this.accountRepository = accountRepository;
  }

  async createAccount(accountData: any, userId: string): Promise<IAccount> {
    const { account_name, website } = accountData;

    const account_id = await generateAccountId();
    const app_secret_token = generateSecretToken();

    const newAccount = await this.accountRepository.create({
      account_id,
      account_name,
      app_secret_token,
      website,
      created_by: new mongoose.Types.ObjectId(userId),
      updated_by: new mongoose.Types.ObjectId(userId),
      created_at: new Date(),
      updated_at: new Date(),
    });

    return newAccount;
  }

  async getAccountById(id: string): Promise<IAccount | null> {
    return await this.accountRepository.findById(id);
  }

  async getAccountsByUser(userId: string): Promise<IAccount[]> {
    return await this.accountRepository.findByUserId(userId);
  }
   async getAccountBySecretToken(secretToken: string): Promise<IAccount | null> {
    return await this.accountRepository.findOne({ app_secret_token: secretToken });
  }

  async updateAccount(id: string, data: any, userId: string): Promise<IAccount | null> {
    const updateData = {
      ...data,
      updated_by: new mongoose.Types.ObjectId(userId),
      updated_at: new Date(),
    };
    return await this.accountRepository.update(id, updateData);
  }

  async deleteAccount(id: string, userId: string): Promise<boolean> {
    const result = await this.accountRepository.delete(id);
    return !!result;
  }

  async searchAccounts(query: string, userId: string): Promise<IAccount[]> {
    return await this.accountRepository.findAll({
      $and: [
        { created_by: new mongoose.Types.ObjectId(userId) },
        {
          $or: [
            { account_name: { $regex: query, $options: 'i' } },
            { account_id: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    });
  }
}