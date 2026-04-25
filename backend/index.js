import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import databaseConnection from "./config/database.js";
import authRoute from "./routes/auth.route.js";
import tweetRoute from "./routes/tweet.route.js";

dotenv.config({
  path: ".env",
});

const PORT = process.env.PORT;
const app = express();

databaseConnection();

//middlewares
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

//api
app.use("/api/v1/auth", authRoute);

app.use("/api/v1/tweet", tweetRoute)

app.get("/home", (req, res) => {
  res.status(200).json({
    message: "Comming from backend...",
  });
});

app.listen(PORT, () => {
  console.log(`Server listen at PORT ${PORT}`);
});
