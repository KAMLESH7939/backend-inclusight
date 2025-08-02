import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();


app.use(express.json());
app.use(cookieParser());

// CORS: allow deployed frontend and localhost during development
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN, // e.g., https://frontend-inclusight-u5nq.vercel.app
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("CORS policy: origin not allowed"), false);
    },
    credentials: true,
  })
);
//efgegfgew

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use('/api/analyze', analysisRoutes);
app.use('/api/user', userRoutes);

if (process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server is running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB, exiting:", err);
    process.exit(1);
  });


