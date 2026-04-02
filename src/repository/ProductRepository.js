import Product from "../models/Product.js";

class ProductRepository {
  async getProducts() {
    return await Product.find();
  }

  async getProductById(id) {
    return await Product.findById(id);
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

  async getProductBySlug(slug) {
    return await Product.findOne({ slug });
  }

  async updateProduct(slug, data) {
    return await Product.findOneAndUpdate({ slug }, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteProduct(slug) {
    return await Product.findOneAndDelete({ slug });
  }

  async decrementStock(productId, size) {
  return await Product.findOneAndUpdate(
    { _id: productId, "sizes.size": size },
    { $inc: { "sizes.$.stock": -1 } },
    { new: true }
  );
}
}

export default new ProductRepository();
