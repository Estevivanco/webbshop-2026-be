import { Router } from "express";
import {
  validateWishlist,
  validateWishlistResult,
} from "../middleware/wishlistValidation.js";
import {
  getWishlist,
  addToWishList,
  removeFromWishlist,
} from "../controller/WishlistController.js";
import { authenticateToken} from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateToken, getWishlist);

router.post("/", authenticateToken, validateWishlist, validateWishlistResult, addToWishList);

router.delete("/:itemId", authenticateToken, removeFromWishlist);

export default router;