import { Router } from "express";
import { 
    getProfile, 
    getAllUsers, 
    getUserById, 
    makeAdmin, 
    deactivateUser, 
    updateUser, 
    updateProfile,
    changePassword,
    deleteProfile, 
    reactivateUser, 
    permanentDeleteUser
} from "../controller/UserController.js";
import { authenticateToken, requireAdmin} from "../middleware/auth.js";
import {validateUpdateUser} from '../middleware/userValidation.js';

const router = Router();

//user routes
router.get('/users/profile', authenticateToken, getProfile);
router.put('/users/profile', authenticateToken, updateProfile);
router.patch('/users/profile/password', authenticateToken, changePassword);
router.delete('/users/profile', authenticateToken, deleteProfile);

//admin routes
router.get('/users', authenticateToken, requireAdmin, getAllUsers);
router.get('/users/:id', authenticateToken, requireAdmin, getUserById);
router.put('/users/:id', authenticateToken, requireAdmin, validateUpdateUser, updateUser);
router.delete('/users/:id/deactivate', authenticateToken, requireAdmin, deactivateUser);
router.patch('/users/:id/reactivate', authenticateToken, requireAdmin, reactivateUser);
router.delete('/users/:id/permanent', authenticateToken, requireAdmin, permanentDeleteUser);
router.post('/users/:id/make-admin', authenticateToken, requireAdmin, makeAdmin);



export default router;
