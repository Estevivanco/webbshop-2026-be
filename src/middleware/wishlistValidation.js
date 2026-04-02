import { body, validationResult } from "express-validator";

export const validateWishlist = [
    body("productId").notEmpty().isMongoId().withMessage("Valid product is required"),
    body("size")
        .isString().notEmpty()
        .matches(/^\d+$/).withMessage("Size must be a number")
];

export const validateWishlistResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};