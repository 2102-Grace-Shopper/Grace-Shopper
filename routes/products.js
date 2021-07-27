const express = require('express');

const productRouter = express.Router();

const {
getProduct,
getProductById
} = require('../db/index');


//This is the GET/product Router:
productRouter.get('/', async (req, res, next) => {
    try {
        const products = getProduct();
        res.send(products)
        return products
    } catch (error) {
        next(error)
    }
})

//This is the GET/product/:productId Router
productRouter.get('/:productId', async(req, res, next) => {
    const { productId } = req.params;
    try {
    const productById = await getProductById(productId)
    res.send(productById)
    } catch (error) {
        next(error)
    }
})









module.exports = productRouter;