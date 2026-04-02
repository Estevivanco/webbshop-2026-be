import { Router } from "express";
import { getProfile, getAllUsers, getUserById, makeAdmin, deactivateUser, updateUser, updateProfile, deleteProfile, reactivateUser, permanentDeleteUser} from "../controller/UserController.js";
import { authenticateToken, requireAdmin} from "../middleware/auth.js";
import {validateUpdateUser} from '../middleware/userValidation.js';

const router = Router();

//user routes
router.get('/users/profile', authenticateToken, getProfile);
router.put('/users/profile', authenticateToken, updateProfile);
router.delete('/users/profile', authenticateToken, deleteProfile);

//wishlist routes
// router.get('/users/wishlist', authenticateToken, getWishlist);
// router.post('/users/wishlist/:productId', authenticateToken, addToWishlist);
// router.delete('/users/wishlist/:productId', authenticateToken, removeFromWishlist);

//admin routes
router.get('/users', authenticateToken, requireAdmin, getAllUsers);
router.get('/users/:id', authenticateToken, requireAdmin, getUserById);
router.put('/users/:id', authenticateToken, requireAdmin, validateUpdateUser, updateUser);
router.delete('/users/:id/deactivate', authenticateToken, requireAdmin, deactivateUser);
router.patch('/users/:id/reactivate', authenticateToken, requireAdmin, reactivateUser);
router.delete('/users/:id/permanent', authenticateToken, requireAdmin, permanentDeleteUser);
router.post('/users/:id/make-admin', authenticateToken, requireAdmin, makeAdmin);



export default router;
