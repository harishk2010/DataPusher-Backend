import { Router } from "express";
import { accountController } from "../config/dependencyInjection";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateAccount } from "../middlewares/validation";

const router = Router();
router.use(authMiddleware);

router.post("/", validateAccount, accountController.createAccount.bind(accountController));
router.get("/", accountController.getAccounts.bind(accountController));
router.get("/search", accountController.searchAccounts.bind(accountController));
router.get("/:id", accountController.getAccountById.bind(accountController));
router.put("/:id", validateAccount, accountController.updateAccount.bind(accountController));
router.delete("/:id", accountController.deleteAccount.bind(accountController));

export default router;