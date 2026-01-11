const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env")
});

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const connectDB = require("../config/db");

const createAdmin = async () => {
  await connectDB();

  const email = "admin@jietjodhpur.ac.in";
  const password = "123456789";

  const exists = await User.findOne({ email });
  if (exists) {
    console.log("❌ Admin already exists");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name: "Super Admin",
    email,
    password: hashedPassword,
    role: "admin"
  });

  console.log("✅ Admin created successfully");
  process.exit(0);
};

createAdmin();
