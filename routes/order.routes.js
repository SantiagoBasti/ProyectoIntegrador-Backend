const router = require('express').Router();
const orderController = require('../controllers/order.controller')
const auth = require("../middlewares/auth")


// Crear Orden
router.post("/orders", auth, orderController.postOrder)
// Obtener Ordenes
router.get("/orders/:id?", auth, orderController.getOrders )

module.exports = router