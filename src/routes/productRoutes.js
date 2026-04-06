import { Router } from "express";
import {
  validateProduct,
  validateProductUpdate,
  validateProductResult,
} from "../middleware/productValidation.js";
import {
  getProducts,
  createProduct,
  getProductBySlug,
  updateProduct,
  deleteProduct,
} from "../controller/ProductController.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", getProducts);

router.get("/:slug", getProductBySlug);

router.post(
  "/",
  authenticateToken,
  requireAdmin,
  validateProduct,
  validateProductResult,
  createProduct,
);

router.put(
  "/:slug",
  authenticateToken,
  requireAdmin,
  validateProductUpdate,
  validateProductResult,
  updateProduct,
);

router.delete("/:slug", authenticateToken, requireAdmin, deleteProduct);

export default router;
