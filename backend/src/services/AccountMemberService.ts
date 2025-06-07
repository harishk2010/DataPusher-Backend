import { IAccountMemberService } from "./interfaces/IAccountMemberService";
import { IAccountMemberRepository } from "../repositories/interfaces/IAccountMemberRepository";
import { IAuthRepository } from "../repositories/interfaces/IAuthRepository";
import { IAccountMember } from "../models/accountMemberModel";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";

export class AccountMemberService implements IAccountMemberService {
  private accountMemberRepository: IAccountMemberRepository;
  private authRepository: IAuthRepository;

  constructor(
    accountMemberRepository: IAccountMemberRepository,
    authRepository: IAuthRepository
  ) {
    this.accountMemberRepository = accountMemberRepository;
    this.authRepository = authRepository;
  }

  async addMemberToAccount(accountId: string, userData: any, adminUserId: string): Promise<IAccountMember> {
    const { email, password, roleId } = userData;

    let user = await this.authRepository.findByEmail(email);
    
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await this.authRepository.create({
        email,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    const existingMember = await this.accountMemberRepository.findByAccountAndUser(accountId, (user._id as string).toString());
    if (existingMember) {
      throw new Error("User is already a member of this account");
    }

    const newMember = await this.accountMemberRepository.create({
      account_id: new Types.ObjectId(accountId),
      user_id: new Types.ObjectId(user._id as string),
      role_id: new Types.ObjectId(roleId),
      created_at: new Date(),
      updated_at: new Date(),
    });

    return newMember;
  }

  async getAccountMembers(accountId: string): Promise<IAccountMember[]> {
    return await this.accountMemberRepository.findByAccountWithDetails(accountId);
  }

  async getUserAccounts(userId: string): Promise<IAccountMember[]> {
    return await this.accountMemberRepository.findByUserId(userId);
  }

  async updateMemberRole(accountId: string, userId: string, roleId: string, adminUserId: string): Promise<IAccountMember | null> {
    const member = await this.accountMemberRepository.findByAccountAndUser(accountId, userId);
    if (!member) return null;

    const updateData = {
      role_id: new Types.ObjectId(roleId),
      updated_at: new Date(),
    };

    return await this.accountMemberRepository.update((member._id as Types.ObjectId).toString(), updateData);
  }

  async removeMemberFromAccount(accountId: string, userId: string, adminUserId: string): Promise<boolean> {
    const member = await this.accountMemberRepository.findByAccountAndUser(accountId, userId);
    if (!member) return false;

    const result = await this.accountMemberRepository.delete((member._id as Types.ObjectId).toString());
    return !!result;
  }

  async checkMemberAccess(accountId: string, userId: string): Promise<IAccountMember | null> {
    return await this.accountMemberRepository.findByAccountAndUser(accountId, userId);
  }
}