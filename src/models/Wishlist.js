import mongoose from "mongoose";
 
const wishlistItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
 
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    }
  },
  { timestamps: true }
);
 
// COMPOUND INDEX — förhindrar dubbletter
// En user ska inte kunna spara samma produkt + storlek två gånger.

wishlistItemSchema.index(
  { user: 1, product: 1 },
  { unique: true }
);
 
const WishlistItem = mongoose.model("WishlistItem", wishlistItemSchema);
 
export default WishlistItem;