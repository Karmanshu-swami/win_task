const express = require('express');
const orderController = require('../controller/orderController');

const router = express.Router();

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);
router.get('/orders/all', orderController.getAllOrdersWithServices);

module.exports = router;
