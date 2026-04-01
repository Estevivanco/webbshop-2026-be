import express from "express";
import {
  createOrder,
  getAllOrders,
  getOneOrder,
  updateOrderStatus,
  getOrdersByUser,
} from "../controllers/orderController.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/", authenticate, authorizeAdmin, getAllOrders);
router.get("/user/:userId", authenticate, getOrdersByUser);
router.get("/:id", authenticate, getOneOrder);
router.patch("/:id/status", authenticate, authorizeAdmin, updateOrderStatus);

export default router;