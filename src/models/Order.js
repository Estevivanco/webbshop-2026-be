import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [
        {
          product: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Product",
            required: true,
          },
          size: {
            type: String,
            required: true,
          },
          unitPrice: {
            type: Number,
            required: true,
            min: 0,
          },
        },
      ],
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

orderSchema.virtual("orderTotal").get(function () {
  if(!this.items || this.items.length === 0) return 0
  return this.items.reduce((sum, item) => sum + item.unitPrice, 0);
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
