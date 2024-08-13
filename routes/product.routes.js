const express = require('express');
const router = express.Router();
const productController = require("../controllers/product.controller")
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin")
const upload = require("../middlewares/upload")
const productValidation = require('../middlewares/validationProduct')

// GET Product
router.get("/products", productController.getProducts)
// GET Product by ID
router.get("/products/:id", productController.getProductsById)
// POST Product
router.post("/products", [ auth, isAdmin, upload, productValidation.validateProduct], productController.postProduct)
// DELETE Product (ID)
router.delete("/products/:id",[auth, isAdmin], productController.deleteProduct)
// PUT Product (ID)
router.put("/products/:id",[auth, isAdmin, upload], productController.updateProduct)



module.exports = router;