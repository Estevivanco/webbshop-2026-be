import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  }, 
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  images: [
    {
      url: { type: String },
      description: { type: String }
    }
  ],
  sizes: [
      {
        size:  { type: String, required: true },
        stock: { type: Number, required: true, default: 0, min: 0 },
      }
  ],
  dropAt: { 
    type: Date, required: true },
  dropEnd: { 
    type: Date },
  dropStatus: {
    type:    String,
    enum:    ["Upcoming", "Live", "SoldOut", "DropEnd"],
    default: "Upcoming",
  },
},
{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;