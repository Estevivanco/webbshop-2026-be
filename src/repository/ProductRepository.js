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

  //TODO: Add more methods as needed
}

export default new ProductRepository();