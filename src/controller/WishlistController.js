import WishlistRepository from "../repository/WishlistRepository.js";

export async function getWishlist(req, res) {
  const userId = req.user.id;
  try {
    const wishlist = await WishlistRepository.getByUser(userId);
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "Failed to get wishlist" });
  }
}

export async function addToWishList(req, res) {
  const userId = req.user.id;
  const { productId, size } = req.body;
  try {
    const wishlist = await WishlistRepository.addItem(userId, productId, size);
    res.status(201).json(wishlist);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Already in wishlist" });
    }
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
}

export async function removeFromWishlist(req, res) {
  const userId = req.user.id;
  const { itemId } = req.params;
  try {
    const wishlist = await WishlistRepository.removeItem(userId, itemId);
    if (!wishlist) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
}
