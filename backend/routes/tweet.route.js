import express from "express";
import {
  createTweetController,
  deleteTweet,
  likeOrDislike,
} from "../controllers/tweet.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create").post(authMiddleware, createTweetController);

router.route("/delete/:id").delete(authMiddleware, deleteTweet);

router.route("/like/:id").put(authMiddleware, likeOrDislike);
export default router;
