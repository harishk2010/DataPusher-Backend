import { IAccount } from "../../models/accountModel";
import { IGenericRepository } from "../GenericRepository";

export interface IAccountRepository extends IGenericRepository<IAccount> {
  findByAccountId(accountId: string): Promise<IAccount | null>;
  findBySecretToken(token: string): Promise<IAccount | null>;
  findByUserId(userId: string): Promise<IAccount[]>;
}
