import WishlistRepository from "../repository/WishlistRepository.js";

export async function getAllWishlists(req, res) {
  try {
    const wishlists = await WishlistRepository.findAll();
    res.json(wishlists);
  } catch (error) {
    res.status(500).json({ error: "Failed to get wishlists" });
  }
}

export async function getWishlist(req, res) {
  const userId = req.user.userId;
  try {
    const wishlist = await WishlistRepository.getByUser(userId);
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "Failed to get wishlist" });
  }
}

export async function addToWishList(req, res) {
  const userId = req.user.userId;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ error: "productId is required" });
  }

  try {
    const wishlist = await WishlistRepository.addItem(userId, productId);
    res.status(201).json(wishlist);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Already in wishlist" });
    }

    res.status(500).json({ error: "Failed to add to wishlist" });
  }
}

export async function removeFromWishlist(req, res) {
  const userId = req.user.userId;
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
