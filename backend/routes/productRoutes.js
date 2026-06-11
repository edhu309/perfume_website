const express = require("express");
const {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin-only routes
router.post("/", protect, adminMiddleware, createProduct);
router.put("/:id", protect, adminMiddleware, updateProduct);
router.delete("/:id", protect, adminMiddleware, deleteProduct);

module.exports = router;
