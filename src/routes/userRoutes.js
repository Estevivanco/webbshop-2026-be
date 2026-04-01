import { Router } from "express";
import { getProfile, getAllUsers, getUserById } from "../controller/UserController.js";
import { authenticateToken} from "../middleware/auth.js";
import {validateUpdateUser} from '../middleware/userValidation.js';

const router = Router();


router.get("/users/:id", getUserById);
router.get("/users", getAllUsers);
router.get('/users/profile', authenticateToken, getProfile);
export default router;
