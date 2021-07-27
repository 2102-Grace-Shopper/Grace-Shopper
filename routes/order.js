const express = require('express')
const orderRouter = express.Router();


/* UNDER CONSTRUCTION */

const {
    getOrders,
    getOrderById
} = require('../db/index')

orderRouter.get('/', async(req, res, next) => {
    try {
        const orders = await getOrders();
        res.send(orders)
    } catch (error) {
        next(error)
    }
});

orderRouter.get('/:orderId', async(req, res, next) => {
    const { orderId } = req.params;
    try {
        const order = await getOrderById(orderId)
        res.send(order)
    } catch (error) {
        next(error)
    }
})
