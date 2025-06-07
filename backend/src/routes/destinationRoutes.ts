import { Router } from "express";
import { destinationController } from "../config/dependencyInjection";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateDestination } from "../middlewares/validation";

const router = Router();

// All destination routes require authentication
router.use(authMiddleware);

router.post("/:accountId/destinations", validateDestination, destinationController.createDestination.bind(destinationController));
router.get("/:accountId/destinations", destinationController.getDestinations.bind(destinationController));
router.get("/:accountId/destinations/search", destinationController.searchDestinations.bind(destinationController));
router.get("/:accountId/destinations/:id", destinationController.getDestinationById.bind(destinationController));
router.put("/:accountId/destinations/:id", validateDestination, destinationController.updateDestination.bind(destinationController));
router.delete("/:accountId/destinations/:id", destinationController.deleteDestination.bind(destinationController));

const destiationRoutes=router
export default destiationRoutes;