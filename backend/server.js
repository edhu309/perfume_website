const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
dotenv.config({ path: path.join(__dirname, ".env") });
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { protect } = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Multer config: store to disk, keep original extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Serve uploaded images as static files
app.use("/uploads", express.static(uploadsDir));

// Image upload endpoint (admin only)
app.post(
  "/api/upload",
  protect,
  adminMiddleware,
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  }
);

// Swagger API Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Scentra API is running" });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Ensure the real admin account exists (credentials from .env)
const User = require("./models/User");
async function ensureTestAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.log("ADMIN_EMAIL not set in .env — skipping admin seed.");
    return;
  }
  const admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    await User.create({
      name: process.env.ADMIN_NAME || "Admin",
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
      phone: process.env.ADMIN_PHONE || "",
    });
    console.log("Admin user created:", adminEmail);
  } else {
    // Update credentials in case they changed in .env
    admin.name = process.env.ADMIN_NAME || admin.name;
    admin.phone = process.env.ADMIN_PHONE || admin.phone;
    admin.password = process.env.ADMIN_PASSWORD;
    admin.role = "admin"; // Always enforce admin role
    await admin.save();
    console.log("Admin user updated:", adminEmail);
  }
}

app.listen(PORT, async () => {
  await ensureTestAdmin();
  console.log(`Server running on port ${PORT}`);
});
