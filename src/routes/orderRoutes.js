import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOneOrder,
  updateOrderStatus,
  getOrdersByUser,
} from "../controller/OrderController.js";
import { authenticateToken } from "../middleware/auth.js";
import { validateOrder } from "../middleware/orderValidation.js";
const router = Router();

router.post("/", authenticateToken, validateOrder, createOrder);
router.get("/", authenticateToken, getAllOrders);
router.get("/user/:userId", authenticateToken, getOrdersByUser);
router.get("/:id", authenticateToken, getOneOrder);
router.patch("/:id/status", authenticateToken, updateOrderStatus);

export default router;
