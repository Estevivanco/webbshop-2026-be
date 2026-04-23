import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import productsRouter from "./routes/productsRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";
import cronRouter from "./routes/cron.js"
import cors from "cors";
import { globalErrorHandler } from "./middleware/errorHandler.js";


const app = express();

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
}

// Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// Middleware

app.use(cors("*"));
// app.use(express.json());

app.use((req, res, next) => {
  if (req.headers["content-type"]?.startsWith("multipart/form-data")) {
    return next();
  }
  express.json()(req, res, next);
});
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Webbshop API",
    stack: "MEN (MongoDB, Express, Node.js)",
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/wishlist", wishlistRouter);
app.use("/products", productsRouter);
app.use("/auth", authRouter);
app.use("/", userRouter);
app.use("/orders", orderRouter);
app.use("/cron")
//TODO: Add more routes as needed

app.use(globalErrorHandler);

export default app;
