import { body, validationResult } from "express-validator";

export const validateProduct = [
  body("name").notEmpty().withMessage("Name is required"),
  body("brand").notEmpty().withMessage("Brand is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be greater than 0"),
  body("dropAt").isISO8601().withMessage("dropAt must be a valid date"),
  body("dropEnd").optional().isISO8601().withMessage("dropEnd must be a valid date"),
  body("sizes").isArray({ min: 1 }).withMessage("sizes must be a non-empty array"),
  body("sizes.*.size").notEmpty().withMessage("Each size must have a size value"),
  body("sizes.*.stock").isInt({ min: 0 }).withMessage("Each size must have a stock of 0 or more"),
   body("description").optional().isString(),
  body("color.name").optional().isString(),
  body("color.hex")
    .optional()
    .matches(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/)
    .withMessage("hex must be a valid color, e.g. #fff or #1a1a1a"),
];

export const validateProductResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};