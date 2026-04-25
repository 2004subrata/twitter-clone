import express from "express";
import { createTweetController } from "../controllers/tweet.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create").post(authMiddleware, createTweetController);
export default router;
