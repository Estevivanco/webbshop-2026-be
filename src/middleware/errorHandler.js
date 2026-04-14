import multer from "multer";

export function globalErrorHandler(err, req, res, next) {
  // Handle Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ 
        error: "File too large",
        message: "Image must be smaller than 5MB" 
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ 
        error: "Too many files",
        message: "Maximum 4 images allowed" 
      });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ 
        error: "Unexpected field",
        message: "Invalid file upload field" 
      });
    }
    return res.status(400).json({ 
      error: "Upload error",
      message: err.message 
    });
  }
  
  // Handle file validation errors from fileFilter
  if (err.message && (err.message.includes("Only image files") || err.message.includes("Invalid file type"))) {
    return res.status(400).json({ 
      error: "Invalid file type",
      message: err.message 
    });
  }
  
  // Handle Cloudinary upload errors
  if (err.http_code || err.message?.includes('Cloudinary')) {
    console.error('Cloudinary error during upload:', err);
    return res.status(503).json({ 
      error: "Image upload service temporarily unavailable",
      message: "Please try again later" 
    });
  }
  
  // Default error handler
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: "Internal server error",
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred. Please try again later.' 
  });
}
