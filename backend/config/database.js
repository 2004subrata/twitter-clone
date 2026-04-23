import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "../config/.env",
});

async function databaseConnection() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to mongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default databaseConnection;
