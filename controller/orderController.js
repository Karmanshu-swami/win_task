const Order = require('../models/orderModels');

const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({
            type: true,
            data: order
        });
    } catch (error) {
        res.status(400).json({
            type: false,
            error: error.message
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            type: true,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            type: false,
            error: error.message
        });
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            type: true,
            data: order
        });
    } catch (error) {
        res.status(400).json({
            type: false,
            error: error.message
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(204).json({
            type: true,
            message: "Order deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            type: false,
            error: error.message
        });
    }
};

const getAllOrdersWithServices = async (req, res) => {
    try {
        const orders = await Order.find().populate('services.id');
        res.status(200).json({
            type: true,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            type: false,
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    updateOrder,
    deleteOrder,
    getAllOrdersWithServices,
};

