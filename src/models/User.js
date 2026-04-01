import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  passwordHash: {
    type: String,
    required: true,
    select: false,
  },
  firstName: {
    type: String,
    required: true,
    trime: true,
    minLength: 3,             
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,             
    maxLength: 50,
  },
  location: {
    address:{
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100
    },
    postCode: {
      type: String,
      required: true,                               
      trim: true,                                         
    },
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
    index: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
  timstamps: true,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) {
    return next();
  }
  const saltRounds = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.passwordHash, saltRounds)
  next();
});

userSchema.pre("save", async function (next){
  if (!this.isModified("email")){
    this.email = this.email.toLowercase().time();
  }
  next()
})

const User = mongoose.model("User", userSchema);

export default User;