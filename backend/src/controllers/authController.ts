import { Request, Response } from "express";
import IAuthService from "../services/interfaces/IAuthService";
import IAuthController from "./interfaces/IAuthController";

export class AuthController implements IAuthController {
    private authService: IAuthService
  constructor( authService: IAuthService) {
    this.authService=authService
  }

  async register(req: Request, res: Response):Promise<void> {
    try {
        const {email, password}=req.body
        console.log("first",req.body)
        const response = await this.authService.register(email, password);
        res.status(201).json(response);
    } catch (error: any) {
        //   return res.status(400).json({ message: error.message });
        throw error
    }
}

async login(req: Request, res: Response):Promise<void> {
    try {
        const {email, password}=req.body
      const response = await this.authService.login(email, password);
      
      res.cookie('accessToken',response)
      .status(200).json(response);
    } catch (error) {
     throw error
    }
  }
async logout(req: Request, res: Response):Promise<void> {
    try {
      
      res.clearCookie('accessToken').json({status:"logged out!"})
      
    } catch (error) {
     throw error
    }
  }
}
