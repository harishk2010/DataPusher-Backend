import { IUser } from "../models/userModel";
import { UserModel } from "../models/userModel";
import { GenericRepository } from "./GenericRepository";
import { IAuthRepository } from "./interfaces/IAuthRepository";

export class AuthRepository
  extends GenericRepository<IUser>
  implements IAuthRepository
{
  constructor() {
    super(UserModel); 
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email }); 
  }
}
