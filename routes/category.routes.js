const express = require("express");
const router = express.Router();
const categoryController = require ('../controllers/category.controller')

//GET categories
router.get('/categories', categoryController.getCategories)
//POST Categories
router.post('/categories', categoryController.createCategories)


module.exports = router