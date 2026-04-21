import { body, validationResult } from "express-validator";

export const validateProduct = [
  body("name").notEmpty().withMessage("Name is required"),
  body("brand").notEmpty().withMessage("Brand is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be greater than 0"),
  body("dropAt")
    .isString()
    .withMessage("dropAt must be a string")
    .isISO8601({ strict: true })
    .withMessage("dropAt must be a valid date (YYYY-MM-DD)"),
  body("dropEnd")
    .optional()
    .isString()
    .withMessage("dropEnd must be a string")
    .isISO8601({ strict: true })
    .withMessage("dropEnd must be a valid date (YYYY-MM-DD)"),
  body("sizes")
    .isArray({ min: 1 })
    .withMessage("sizes must be a non-empty array"),
  body("sizes.*.size")
    .notEmpty()
    .matches(/^\d+$/)
    .withMessage("Each size must be a number"),
  body("sizes.*.stock")
    .isInt({ min: 0 })
    .withMessage("Each size must have a stock of 0 or more"),
  body("description").optional().isString(),
  body("colors").optional().isArray().withMessage("colors must be an array"),
  body("colors.*.name").optional().isString(),
  body("colors.*.hex")
    .optional()
    .matches(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/)
    .withMessage("hex must be a valid color, e.g. #fff or #1a1a1a"),
];

export const validateProductUpdate = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("brand").optional().notEmpty().withMessage("Brand cannot be empty"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be 0 or greater"),
  body("dropAt")
    .optional()
    .isString()
    .withMessage("dropAt must be a string")
    .isISO8601({ strict: true })
    .withMessage("dropAt must be a valid date (YYYY-MM-DD)"),
  body("dropEnd")
    .optional()
    .isString()
    .withMessage("dropEnd must be a string")
    .isISO8601({ strict: true })
    .withMessage("dropEnd must be a valid date (YYYY-MM-DD)"),
  body("sizes")
    .optional()
    .isArray({ min: 1 })
    .withMessage("sizes must be a non-empty array"),
  body("sizes.*.size")
    .optional()
    .notEmpty()
    .matches(/^\d+$/)
    .withMessage("Each size must be a number"),
  body("sizes.*.stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Each size must have a valid stock"),
  body("description").optional().isString(),
  body("colors").optional().isArray().withMessage("colors must be an array"),
  body("colors.*.name").optional().isString(),
  body("colors.*.hex")
    .optional()
    .matches(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/)
    .withMessage("hex must be a valid color, e.g. #fff or #1a1a1a"),
];

export const parseProductFormData = (req,res,next) => {
  try {
    if (typeof req.body.sizes === "string") {
      req.body.sizes = JSON.parse(req.body.sizes);
    }

    if (typeof req.body.colors === "string") {
      req.body.colors = JSON.parse(req.body.colors);
    }

    if (typeof req.body.price === "string") {
      req.body.price = Number(req.body.price);
    }
    console.log("parsed sizes:", JSON.stringify(req.body.sizes));

    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid form data" });
  }
} 

export const validateProductResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
