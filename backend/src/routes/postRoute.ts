import express, { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import postController from "../controllers/postController";
import multer from "multer";
import { storage } from "../middleware/multerMiddleware";
import { limiter } from "../middleware/rateLimiter";

const router: Router = express.Router();
const upload = multer({ storage: storage });
router.route("/post").post(
  limiter,
  authMiddleware.handleAuthentication,

  upload.single("file"),
  postController.postMoment
);
export default router;
