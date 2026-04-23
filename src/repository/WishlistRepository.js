import Wishlist from "../models/Wishlist.js";

class WishlistRepository {
  async addItem(userId, productId) {
    const wishlist = new Wishlist({ user: userId, product: productId });
    await wishlist.save();
    await wishlist.populate("product");
    return wishlist;
  }

  async getByUser(userId) {
    return await Wishlist.find({ user: userId }).populate("product");
  }

  async removeItem(userId, itemId) {
    return await Wishlist.findOneAndDelete({ user: userId, _id: itemId });
  }

  async findAll() {
    return await Wishlist.find().populate("product").populate("user", "email firstName lastName");
  }
}

export default new WishlistRepository();
