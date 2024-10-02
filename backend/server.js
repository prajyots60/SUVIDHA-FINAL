import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from './lib/db.js';
import authRoutes from "./routes/auth.route.js";
import vendorRoutes from "./routes/vendor.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cookieParser()); //parse cookies in request headers
app.use(cors({
  origin: "http://localhost:5173", // Allow only this origin
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json()); //parse json data in request body


app.use("/api/auth", authRoutes);
app.use("/api/vendor", vendorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});