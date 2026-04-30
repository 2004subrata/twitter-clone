import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

/**
 * - Register a new user account.
 * - POST /api/v1/auth/register
 */
export const registerController = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    // basic validation
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isExists = await User.findOne({ email });
    if (isExists) {
      return res.status(401).json({
        success: false,
        message: "User already exist.",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * - Login existing user
 * - POST /api/v1/auth/login
 */
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist with this email",
      });
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(201)
      .cookie("token", token, { expiresIn: "1d", httpOnly: true })
      .json({
        success: true,
        message: `Welcome back ${user.name}`,
      });
  } catch (error) {
    console.log(error);
  }
};

/**
 * - Controller to log out a user by clearing the authentication cookie.
 */
export const logoutController = (req, res) => {
  try {
    return res.status(200).clearCookie("token").json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
