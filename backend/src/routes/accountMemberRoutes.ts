import { Router } from "express";
import { accountMemberController } from "../config/dependencyInjection";
import { authMiddleware, adminOnly } from "../middlewares/authMiddleware";
import { validateMember, validateRoleUpdate } from "../middlewares/validation";

const router = Router();

// All member routes require authentication
router.use(authMiddleware);

// Admin only routes
router.post("/:accountId/members",authMiddleware, adminOnly, validateMember, accountMemberController.addMember.bind(accountMemberController));
router.put("/:accountId/members/:userId/role", adminOnly, validateRoleUpdate, accountMemberController.updateMemberRole.bind(accountMemberController));
router.delete("/:accountId/members/:userId", adminOnly, accountMemberController.removeMember.bind(accountMemberController));

// Routes accessible by both admin and normal users
router.get("/:accountId/members", accountMemberController.getMembers.bind(accountMemberController));
router.get("/user/accounts", accountMemberController.getUserAccounts.bind(accountMemberController));

const memberRoutes=router
export default memberRoutes;