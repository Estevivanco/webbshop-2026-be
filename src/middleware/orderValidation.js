import { body, validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

export const validateOrder = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Orders must contain at least one item"),
  body("items.*.product")
    .notEmpty()
    .withMessage("Each item must have an ID")
    .isMongoId()
    .withMessage("Product ID must be a valid MongoDB ID"),
  body("items.*.size").notEmpty().withMessage("Each item must have a size"),

  handleValidationErrors
];
