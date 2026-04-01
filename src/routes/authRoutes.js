import { Router } from "express";
import { register, login, logout, refreshToken } from "../controller/AuthController.js";
import { validateRegister, validateLogin, validateRefreshToken } from "../middleware/authValidation.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/refresh", validateRefreshToken, refreshToken);
router.post("/logout", logout);

export default router;
