const express = require('express')
const orderRouter = express.Router();

const {
    getOrders,
    getOrderById,
    createOrders,
    addOrderProducts,
    updateOrder,
    cancelOrder
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

//need to fix userId on db
orderRouter.post('/', async(req, res, next) => {
   const {status, datePlaced } = req.body;
   try {
       const newOrder = await createOrders({status, datePlaced})
       res.send(newOrder)
   } catch (error) {
       next(error)
   }
})

orderRouter.post('/:orderId/products', async(req, res, next) => {
    const { orderId } = req.params;
    const { productId, price, quantity } = req.body;
    try {
        const newOrderProduct = await addOrderProducts({orderId, productId, price, quantity})
        res.send(newOrderProduct)
    } catch (error) {
        next(error)
    }
})

orderRouter.patch('/:orderId', async(req, res, next) => {
    const { orderId } = req.params;
    const { status, userId } = req.body;
    try {
        const updatedOrder = await updateOrder({orderId, status, userId});
        res.send(updatedOrder)
    } catch (error) {
        next(error)
    }
})


orderRouter.delete('/:orderId', async(req, res, next) => {
    const { orderId } = req.params;
    try {
        const deletedOrder = await cancelOrder(orderId)
        res.send(deletedOrder)
    } catch (error) {
        next(error)
    }
})

module.exports = orderRouter;



