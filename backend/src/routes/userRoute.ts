import express, { Router } from "express";
import userController from "../controllers/userController";
const router: Router = express.Router();
router
  .route("/register")
  .post(userController.registerUser, userController.createMultitenant);
router.route("/login").post(userController.loginUser);
router.route("/verify/:email").post(userController.verifyToken);
export default router;
