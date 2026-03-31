import { Router } from "express";
import { validateProduct, validateProductResult } from "../middleware/productValidation.js";
import { getProducts, createProduct } from "../controller/ProductController.js";
const router = Router();

router.get("/", getProducts);

//TODO: Add more routes as needed

//TODO GET /products/:slug

router.post("/", validateProduct, validateProductResult, createProduct);

//TODO PUT /products/:slug

//TODO DELETE /products/:slug
export default router;