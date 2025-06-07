import bcrypt from "bcryptjs";
import  IAuthService  from "./interfaces/IAuthService";
import { IAuthRepository } from "../repositories/interfaces/IAuthRepository";
import { accessToken } from "../utils/jwt";

export class AuthService implements IAuthService {
    private  authRepository: IAuthRepository
  constructor(  authRepository: IAuthRepository) {
    this.authRepository=authRepository
  }

  async register(email:string, password:string) {
    

    const exists = await this.authRepository.findByEmail(email);
    if (exists) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.authRepository.create({
      email,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const token = await accessToken({ id: newUser._id as string, email: newUser.email });

    return { user: newUser, token };
  }

  async login(email:string, password:string) {


    const user = await this.authRepository.findByEmail(email);
    console.log(user,"user-------------")
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    console.log("Admin",user.role,"roleeeeeeeeeeeeeeeee")
    const token = await accessToken({ id: user._id as string, email: user.email ,role:user?.role });

    return { user, token };
  }
}
