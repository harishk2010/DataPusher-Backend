import IAuthController from "../controllers/interfaces/IAuthController";
import IAuthService from "../services/interfaces/IAuthService";
import { IAuthRepository } from "../repositories/interfaces/IAuthRepository";
import { AuthController } from "../controllers/authController";
import { AuthService } from "../services/authServices";
import { AuthRepository } from "../repositories/AuthRepository";

// Account dependencies
import { IAccountController } from "../controllers/interfaces/IAccountController";
import { IAccountService } from "../services/interfaces/IAccountService";
import { IAccountRepository } from "../repositories/interfaces/IAccountRepository";
import { AccountController } from "../controllers/AccountController";
import { AccountService } from "../services/AccountService";
import { AccountRepository } from "../repositories/AccountRepository";

import { IDestinationRepository } from "../repositories/interfaces/IDestinationRepository";
import { DestinationRepository } from "../repositories/DestinationRepository";
import { IDestinationService } from "../services/interfaces/IDestinationService";
import { DestinationService } from "../services/DestinationService";
import { IDestinationController } from "../controllers/interfaces/IDestinationController";
import { DestinationController } from "../controllers/DestinationController";
import { IAccountMemberController } from "../controllers/interfaces/IAccountMemberController";
import { AccountMemberController } from "../controllers/AccountMemberController";
import { IAccountMemberService } from "../services/interfaces/IAccountMemberService";
import { AccountMemberService } from "../services/AccountMemberService";
import { IAccountMemberRepository } from "../repositories/interfaces/IAccountMemberRepository";
import { AccountMemberRepository } from "../repositories/AccountMemberRepository";
import { ILogController } from "../controllers/interfaces/ILogController";
import { ILogRepository } from "../repositories/interfaces/ILogRepository";
import { LogRepository } from "../repositories/LogRepository";
import { ILogService } from "../services/interfaces/ILogService";
import { LogService } from "../services/LogService";
import { LogController } from "../controllers/LogController";
import { IDataHandlerService } from "../services/interfaces/IDataHandlerService";
import { DataHandlerService } from "../repositories/DataHandlerService";
import { IDataHandlerController } from "../controllers/interfaces/IDataHandlerController";
import { DataHandlerController } from "../controllers/DataHandlerController";

const authRepository:IAuthRepository=new AuthRepository()
const authService:IAuthService=new AuthService(authRepository)
const authController:IAuthController=new AuthController(authService)

const accountRepository: IAccountRepository = new AccountRepository();
const accountService: IAccountService = new AccountService(accountRepository);
const accountController: IAccountController = new AccountController(accountService);

const destinationRepository:IDestinationRepository=new DestinationRepository()
const destinationService:IDestinationService=new DestinationService(destinationRepository)
const destinationController:IDestinationController=new DestinationController(destinationService)

const accountMemberRepository:IAccountMemberRepository=new AccountMemberRepository()
const accountMemberService:IAccountMemberService=new AccountMemberService(accountMemberRepository,authRepository)
const accountMemberController:IAccountMemberController=new AccountMemberController(accountMemberService)


const logRepository:ILogRepository=new LogRepository()
const logService:ILogService=new LogService(logRepository)
const logController:ILogController=new LogController(logService)


const dataHandlerService:IDataHandlerService=new DataHandlerService(accountService,destinationService,logService)
const dataHandlerController:IDataHandlerController=new DataHandlerController(dataHandlerService)

export{dataHandlerService, authController,accountController,destinationController ,accountMemberController , logController,dataHandlerController}