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
      product.updateDropStatus();
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
    return await Product.findOneAndUpdate({ slug }, { $set: data }, {
      new: true,
      runValidators: true,
    });
  }

  async deleteProduct(slug) {
    return await Product.findOneAndDelete({ slug });
  }

  async decrementStock(productId, size, quantity = 1) {
  return await Product.findOneAndUpdate(
    { _id: productId, "sizes.size": size },
    { $inc: { "sizes.$.stock": -quantity } },
    { new: true }
  );
}
}

export default new ProductRepository();
