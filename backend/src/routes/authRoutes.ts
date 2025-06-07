import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { authController } from "../config/dependencyInjection";


const router = Router();


router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.post("/logout", authController.logout.bind(authController));


const authRoutes=router
export default authRoutes;
