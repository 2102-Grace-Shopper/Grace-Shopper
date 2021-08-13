const express = require('express');

const productRouter = express.Router();

const {
getProduct,
getProductById,
getOrdersByProducts,
updateProduct,
createProduct, 
destroyProduct
} = require('../db/index');

productRouter.get('/', async (req, res, next) => {
    try {
        const products = await getProduct();
        res.send({products:products})
        return products
    } catch (error) {
        next(error)
    }
})

productRouter.get('/:productId', async(req, res, next) => {
    const { productId } = req.params;
    try {
    const productById = await getProductById(productId)
    res.send(productById)
    } catch (error) {
        next(error)
    }
})


productRouter.get('/:productId/orders', async (req, res, next) => {
     const { productId } = req.params;
     try {
         const orders = await getOrdersByProducts({id: productId});
         res.send(orders)
     } catch (error) {
         next(error)
     }
})

productRouter.patch('/:productId', async(req, res, next) => {
    const { productId } = req.params;
    try {
        const updatedProduct = await updateProduct({id: productId, ...req.body})
        res.send(updatedProduct)
    } catch (error) {
        next(error)
    }
})

productRouter.post('/', async(req, res, next) => {
    try {
        const createdProduct = await createProduct({...req.body})
        res.send(createdProduct)
    } catch (error) {
        next(error)
    }
})

productRouter.delete('/:productId', async(req, res, next) => {
    const { productId } = req.params;
    try {
        const deletedProduct = await destroyProduct(productId)
        res.send(deletedProduct)
    } catch (error) {
        next(error)
    }
})

module.exports = productRouter;