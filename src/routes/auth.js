import { Router } from "express";
import { validateRegister, validateAuthResult } from "../middleware/authValidation.js";
import { register } from "../controller/UserController.js";

const router = Router();

router.post(
  "/register",
  validateRegister,
  validateAuthResult,
  register
);

export default router;
