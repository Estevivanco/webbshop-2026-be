import Product from "../models/Product.js";

class ProductRepository {
  async getProducts() {
    return await Product.find();
  }

  async createProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async getProductsBySlug(slug) {
    return await Product.findOne({ slug });
  }

  async updateProduct(slug, data) {
    return await Product.findOneAndUpdate(
      { slug },
      data,
      { new: true, runValidators: true }
    );
  }

  async deleteProduct(slug) {
    return await Product.findOneAndDelete({ slug });
  }
}

export default new ProductRepository();