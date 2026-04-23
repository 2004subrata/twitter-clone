import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";

dotenv.config({
  path: ".env",
});

const PORT = process.env.PORT;
const app = express();

databaseConnection();

app.listen(PORT, () => {
  console.log(`Server listen at PORT ${PORT}`);
});
