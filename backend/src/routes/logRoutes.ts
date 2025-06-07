import { Router } from "express";
import { logController } from "../config/dependencyInjection";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.get("/:accountId/logs", logController.getLogs.bind(logController));
router.get("/:accountId/logs/search", logController.searchLogs.bind(logController));
router.get("/:accountId/logs/stats", logController.getLogStats.bind(logController));
router.get("/:accountId/logs/status", logController.getLogsByStatus.bind(logController));
router.get("/:accountId/logs/daterange", logController.getLogsByDateRange.bind(logController));
router.get("/event/:eventId", logController.getLogByEventId.bind(logController));
router.get("/logs/:id", logController.getLogById.bind(logController));

const logRoutes=router
export default logRoutes;