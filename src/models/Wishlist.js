import mongoose from "mongoose";

// Istället för en inbäddad array på User sparar vi varje
// önskelista-rad som ett eget dokument.
 
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
    },
 
    size: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
 
// COMPOUND INDEX — förhindrar dubbletter
// En user ska inte kunna spara samma produkt + storlek två gånger.

wishlistItemSchema.index(
  { user: 1, product: 1, size: 1 },
  { unique: true }
);
 
const WishlistItem = mongoose.model("WishlistItem", wishlistItemSchema);
 
export default WishlistItem;