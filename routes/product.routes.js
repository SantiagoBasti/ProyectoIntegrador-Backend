const express = require('express');
const router = express.Router();
const productController = require("../controllers/product.controller")

// GET Product
router.get("/products", productController.getProducts)
// GET Product by ID
// POST Product
// DELETE Product (ID)
// PUT Product (ID)





module.exports = router;