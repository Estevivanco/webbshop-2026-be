import { Router } from "express";
import {
  validateProduct,
  validateProductUpdate,
  validateProductResult,
  parseProductFormData
} from "../middleware/productValidation.js";
import {
  getProducts,
  createProduct,
  getProductBySlug,
  updateProduct,
  deleteProduct,
} from "../controller/ProductController.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";
import upload from "../middleware/imageUploader.js";

const router = Router();

router.get("/", getProducts);

router.get("/:slug", getProductBySlug);

router.post(
  "/",
  authenticateToken,
  requireAdmin,
  upload.array("images",4),
  parseProductFormData,
  validateProduct,
  validateProductResult,
  createProduct,
);

router.put(
  "/:slug",
  authenticateToken,
  requireAdmin,
  upload.array("images",4),
  validateProductUpdate,
  validateProductResult,
  updateProduct,
);

router.delete("/:slug", authenticateToken, requireAdmin, deleteProduct);

export default router;
