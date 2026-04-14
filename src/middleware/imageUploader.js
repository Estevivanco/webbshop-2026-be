import multer from "multer"
import path from "path"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import crypto from "crypto"

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error("Missing Cloudinary configuration. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in environment variables.")
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => {
      if (!req.body.brand || !req.body.name) {
        return "sole_search_images/uncategorized"
      }
      const brand = req.body.brand.toLowerCase().replace(/\s+/g, "-")
      const productName = req.body.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
      return `sole_search_images/${brand}/${productName}`
    },
    allowed_formats: ["jpg", "jpeg", "png", "webp", "svg"],
    public_id: (req, file) => {
      const name = req.body.name
        ? req.body.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
        : "product"
      const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`
      return `${uniqueSuffix}-${name}`
    }
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".webp", ".svg"]
    const ext = path.extname(file.originalname).toLowerCase()
    
    if (!allowed.includes(ext)) {
      return cb(new Error("Only image files allowed"))
    }

    const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml"]
    if (!allowedMimes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"))
    }
    
    cb(null, true)
  }
})

export default upload