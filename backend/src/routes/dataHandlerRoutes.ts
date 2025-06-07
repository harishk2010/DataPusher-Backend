import { Router } from "express";
import { dataHandlerController } from "../config/dependencyInjection";
import  {accountRateLimiter}  from "../middlewares/rateLimiter";

const router = Router();

// Data handling endpoint with rate limiting
router.post("/incoming_data", accountRateLimiter, dataHandlerController.handleIncomingData.bind(dataHandlerController));

const dataHandlerRoutes=router
export default dataHandlerRoutes;