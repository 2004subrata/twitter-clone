import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "../middlewares/.env",
});

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookie;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded.userId;

    next();
  } catch (error) {}
};

export default authMiddleware;
