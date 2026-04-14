import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOneOrder,
  updateOrderStatus,
  getOrdersByUser,
  deleteOrder,
} from "../controller/OrderController.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";
import { validateOrder } from "../middleware/orderValidation.js";
const router = Router();

router.post("/", authenticateToken, validateOrder, createOrder);
router.get("/", authenticateToken, requireAdmin, getAllOrders);
router.get("/user/:userId", authenticateToken, getOrdersByUser);
router.get("/:id", authenticateToken, getOneOrder);
router.patch("/:id/status", authenticateToken, requireAdmin, updateOrderStatus);
router.delete("/:id", authenticateToken, requireAdmin, deleteOrder)

export default router;
