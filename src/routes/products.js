import { Router } from "express";
import { validateProduct, validateProductUpdate, validateProductResult } from "../middleware/productValidation.js";
 import { getProducts, createProduct, getProductBySlug, updateProduct, deleteProduct } from "../controller/ProductController.js";
const router = Router();

router.get("/", getProducts);

router.get("/:slug", getProductBySlug);

router.post("/", validateProduct, validateProductResult, createProduct);

router.put("/:slug", validateProductUpdate, validateProductResult, updateProduct);

router.delete("/:slug", deleteProduct);

export default router;