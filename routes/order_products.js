const orderProductRouter = require('express').Router();

const {
    updateOrderProduct,
    destoryOrderProduct,
    getOrderProductsByOrderId
    } = require('../db/order_products')
    
    const {
        getOrderById
    } = require('../db/orders')
    
    orderProductRouter.patch('/:orderproductId', async (req, res, next) => {
        try {
            const { orderProductId } = req.params;
            const { quantity, price } = req.body;
            const updatedOP = await updateOrderProduct({id: orderProductId, quantity, price})
            res.send(updatedOP)
        } catch (error) {
            next(error)
        }
    })
    
    orderProductRouter.delete('/:orderProductId', async (req, res, next) => {
        try {
            const { orderProductId } = req.params;
            const deletedOP = await destoryOrderProduct(orderProductId)
            res.send(deletedOP)
        } catch (error) {
            next(error)
        }
    })

module.exports = orderProductRouter