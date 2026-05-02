import express from "express";
import { bookmarks } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/bookmark/:id").put(authMiddleware, bookmarks);

export default router;
