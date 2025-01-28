import express, { Router } from "express";
import userController from "../controllers/userController";
import sanitizehtml from "../services/sanitizeHtml";
const router: Router = express.Router();
router
  .route("/register")
  .post(
    sanitizehtml,
    userController.registerUser,
    userController.createMultitenant
  );
router.route("/login").post(sanitizehtml, userController.loginUser);
router.route("/verify/:email").post(sanitizehtml, userController.verifyToken);
export default router;
