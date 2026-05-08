import express from "express";
import {
  bookmarks,
  getMyProfile,
  getOtherUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/bookmark/:id").put(authMiddleware, bookmarks);

router.route("/profile/:id").get(authMiddleware, getMyProfile);

router.route("/otheruser").get(authMiddleware, getOtherUser);

export default router;
