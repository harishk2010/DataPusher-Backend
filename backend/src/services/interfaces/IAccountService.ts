import { IAccount } from "../../models/accountModel";

export interface IAccountService {
  createAccount(accountData: any, userId: string): Promise<IAccount>;
  getAccountById(id: string): Promise<IAccount | null>;
  getAccountsByUser(userId: string): Promise<IAccount[]>;
  getAccountBySecretToken(secretToken: string): Promise<IAccount | null>;

  updateAccount(
    id: string,
    data: any,
    userId: string
  ): Promise<IAccount | null>;
  deleteAccount(id: string, userId: string): Promise<boolean>;
  searchAccounts(query: string, userId: string): Promise<IAccount[]>;
}
