import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    color: {
      name: {
        type: String,
        trim: true,
      },
      hex: {
        type: String,
        trim: true,
        // Validerar att hex-koden är korrekt format: #fff eller #ffffff
        validate: {
          validator: (val) =>
            !val || /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val),
          message:
            "hex must be a valid color code, ex: #fff or #1a1a1a",
        },
      },
    },
    images: [
      {
        url: { type: String },
        description: { type: String },
      },
    ],
    sizes: [
      {
        size: { type: String, required: true },
        stock: { type: Number, required: true, default: 0, min: 0 },
      },
    ],

    dropAt: {
      type: Date,
      required: true,
    },
    dropEnd: {
      type: Date,
    },
    dropStatus: {
      type: String,
      enum: ["Upcoming", "Live", "SoldOut", "DropEnd"],
      default: "Upcoming",
    },
  },
  { timestamps: true },
);

// PRE-SAVE HOOK — generera slug automatiskt från name
productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      locale: "sv",
    });
  }
  next();
});

// VALIDATOR: dropEnd måste vara efter dropAt
productSchema.path("dropEnd").validate(function (val) {
  if (!val) return true;
  return val > this.dropAt;
}, "dropEnd must be after dropAt");

// VIRTUAL: totalt lager för produkten
productSchema.virtual("totalStock").get(function () {
  return this.sizes.reduce((sum, s) => sum + s.stock, 0);
});

// METOD: synka dropStatus med tid och lager
// Anropa efter köp: product.updateDropStatus(); await product.save();
productSchema.methods.updateDropStatus = function () {
  const now = new Date();
  if (now < this.dropAt) {
    this.dropStatus = "Upcoming";
  } else if (this.dropEnd && now > this.dropEnd) {
    this.dropStatus = "DropEnd";
  } else if (this.totalStock === 0) {
    this.dropStatus = "SoldOut";
  } else {
    this.dropStatus = "Live";
  }
};

const Product = mongoose.model("Product", productSchema);

export default Product;