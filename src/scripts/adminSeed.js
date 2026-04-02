import User from "../models/User.js"
import mongoose from "mongoose"
import "dotenv/config"

await mongoose.connect(process.env.MONGODB_URI)

const existingAdmin = await User.findOne({email: process.env.ADMIN_EMAIL})

const adminUser ={
    email: process.env.ADMIN_EMAIL,
    passwordHash: process.env.ADMIN_PASSWORD,
    firstName: "Don Admin",
    lastName: "Adminovic",
    location: {
        address: "adminvägen 420",
        city: "Gotham",
        postCode: "G-Unit"
    },
    role: "admin",
    isActive: true
}

if(!existingAdmin){
    const admin = new User(adminUser)
    await admin.save()
    console.log("Admin created")
} else {
    console.log("Admin already exists")
}

await mongoose.disconnect()
console.log("Disconnected from MongoDB")
process.exit(0)