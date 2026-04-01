import { body} from 'express-validator';

export const validateUpdateUser = [
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail()
    .toLowerCase(),

  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('First name must be between 3 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes'),

  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Last name must be between 3 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Last name can only contain letters, spaces, hyphens, and apostrophes'),

  body('location.address')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Address must be between 2 and 100 characters'),

  body('location.city')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('City must be between 2 and 100 characters'),

  body('location.postCode')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Post code is required'),

];

