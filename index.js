import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import router from "./Routes/routes.js";

configDotenv();
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Routes
app.use("/", router);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
