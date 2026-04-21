import ProductRepository from "../repository/ProductRepository.js";
import { v2 as cloudinary } from "cloudinary"

export async function getProducts(req, res) {
  const products = await ProductRepository.getProducts();
  res.json(products);
}

export async function createProduct(req, res) {
  try {
    // Cloudinary laddar upp filer automatiskt och returnerar ULRs i file.path
    const imageUrls = req.files?.map(file => ({
      url: file.path
    })) || []

    const parsedBody = {
      ...req.body,
      sizes:
        typeof req.body.sizes === "string"
          ? JSON.parse(req.body.sizes)
          : req.body.sizes,
      colors:
        typeof req.body.colors === "string"
          ? JSON.parse(req.body.colors)
          : req.body.colors,
      price:
        typeof req.body.price === "string"
          ? Number(req.body.price)
          : req.body.price,
    }

    const product = await ProductRepository.createProduct({
      ...parsed.body,
      images: imageUrls
    });

    res.status(201).json(product);

  } catch (error) {
    // Cleanup: Delete uploaded images from Cloudinary if DB save failed
    if (req.files && req.files.length > 0) {
      try {
        await Promise.all(req.files.map(file => 
          cloudinary.uploader.destroy(file.filename)
        ));
        console.log('Cleaned up orphaned images from Cloudinary');
      } catch (cleanupError) {
        console.error('Failed to cleanup Cloudinary images:', cleanupError);
      }
    }
    
    // Handle database duplicate error
    if (error.code === 11000) {
      return res.status(409).json({ error: "A product with this name already exists" });
    }
    
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ 
        error: "Validation failed",
        details: Object.values(error.errors).map(e => e.message)
      });
    }
    
    console.error('Unexpected error creating product:', error);
    res.status(500).json({ error: "Failed to create product" });
  }
}

export async function getProductBySlug(req, res) {
  const product = await ProductRepository.getProductBySlug(req.params.slug);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product)
}

export async function updateProduct(req, res) {
  try {
    const updateData = { ...req.body };
    
    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map(file => ({
        url: file.path
      }));
      updateData.images = imageUrls;
    }
    
    const product = await ProductRepository.updateProduct(req.params.slug, updateData);
    if (!product) {
      // Cleanup: Delete uploaded images from Cloudinary if product not found
      if (req.files && req.files.length > 0) {
        try {
          await Promise.all(req.files.map(file => 
            cloudinary.uploader.destroy(file.filename)
          ));
          console.log('Cleaned up orphaned images from Cloudinary');
        } catch (cleanupError) {
          console.error('Failed to cleanup Cloudinary images:', cleanupError);
        }
      }
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
    
  } catch (error) {
    // Cleanup: Delete uploaded images from Cloudinary if DB save failed
    if (req.files && req.files.length > 0) {
      try {
        await Promise.all(req.files.map(file => 
          cloudinary.uploader.destroy(file.filename)
        ));
        console.log('Cleaned up orphaned images from Cloudinary');
      } catch (cleanupError) {
        console.error('Failed to cleanup Cloudinary images:', cleanupError);
      }
    }
    
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ 
        error: "Validation failed",
        details: Object.values(error.errors).map(e => e.message)
      });
    }
    
    console.error('Unexpected error updating product:', error);
    res.status(500).json({ error: "Failed to update product" });
  }
}

export async function deleteProduct(req, res) {
  try {
    // First, get the product to access its images before deletion
    const product = await ProductRepository.getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete product from database
    await ProductRepository.deleteProduct(req.params.slug);

    // Cleanup: Delete entire product folder from Cloudinary
    if (product.images && product.images.length > 0) {
      try {
        // Construct folder path from product data
        const brand = product.brand.toLowerCase().replace(/\s+/g, "-");
        const productName = product.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        const folderPath = `sole_search_images/${brand}/${productName}`;
        
        // Delete all resources in the folder
        await cloudinary.api.delete_resources_by_prefix(folderPath);
        
        // Delete the empty folder
        await cloudinary.api.delete_folder(folderPath);
        
        console.log(`Deleted product folder from Cloudinary: ${folderPath}`);
      } catch (cleanupError) {
        console.error('Failed to cleanup Cloudinary folder:', cleanupError);
      }
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: "Failed to delete product" });
  }
}
