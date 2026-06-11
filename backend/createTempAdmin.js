// This script creates a temporary admin user for testing
const mongoose = require("mongoose");
const User = require("./models/User");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/scentra";

async function createAdmin() {
  await mongoose.connect(MONGO_URI);
  const adminEmail = "admin@test.com";
  const admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    await User.create({
      name: "Admin Tester",
      email: adminEmail,
      password: "admin123",
      role: "admin",
      phone: "9999999999"
    });
    console.log("Temporary admin user created:", adminEmail);
  } else {
    console.log("Admin user already exists:", adminEmail);
  }
  await mongoose.disconnect();
}

createAdmin();
