import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import productsRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js"
import wishlistRouter from "./routes/wishlistRoutes.js"
import cors from "cors";

const app = express();

// Middleware

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Webbshop API", stack: "MEN (MongoDB, Express, Node.js)" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/wishlist", wishlistRouter);
app.use("/products", productsRouter);
app.use("/auth", authRouter);
app.use("/", userRouter);
app.use("/orders", orderRouter)
//TODO: Add more routes as needed

export default app;
