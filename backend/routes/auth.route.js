import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * - POST /api/v1/auth/register
 */
router.route("/register").post(registerController);

/**
 * - POST /api/v1/auth/login
 */
router.route("/login").post(loginController);

/**
 * 
 */
router.route("/logout").get(logoutController)

export default router;
