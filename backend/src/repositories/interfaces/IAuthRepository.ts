import { IUser } from "../../models/userModel";
import { IGenericRepository } from "../GenericRepository";

export interface IAuthRepository extends IGenericRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}
