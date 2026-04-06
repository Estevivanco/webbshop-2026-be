import { Router } from "express";
import {
  validateWishlist,
  validateWishlistResult,
} from "../middleware/wishlistValidation.js";
import {
  getAllWishlists,
  getWishlist,
  addToWishList,
  removeFromWishlist,
} from "../controller/WishlistController.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/all", authenticateToken, requireAdmin, getAllWishlists);

router.get("/", authenticateToken, getWishlist);

router.post("/", authenticateToken, validateWishlist, validateWishlistResult, addToWishList);

router.delete("/:itemId", authenticateToken, removeFromWishlist);

export default router;