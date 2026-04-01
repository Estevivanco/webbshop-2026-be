import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

export const validateRegister = [
  body('firstName')
    .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('First name must be between 3 and 50 characters')
      .matches(/^[a-zA-Z\s'-]+$/)
      .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes')
    .escape(),

  body('lastName')
    .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('Last name must be between 3 and 50 characters')
      .matches(/^[a-zA-Z\s'-]+$/)
      .withMessage('Last name can only contain letters, spaces, hyphens, and apostrophes')
    .escape(),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail()
    .toLowerCase(),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    
  body('location.address')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Address must be between 2 and 100 characters'),
    
  body('location.city')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('City must be between 2 and 100 characters'),
    
  body('location.postCode')
    .trim()
    .notEmpty()
    .withMessage('Post code is required'),

    handleValidationErrors
  ];
    
export const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail()
    .toLowerCase(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  handleValidationErrors
];

export const validateAuthResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateRefreshToken = [
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required')
    .isString()
    .withMessage('Refresh token must be a string'),
  
  handleValidationErrors
];