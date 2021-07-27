const apiRouter = require('express').Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});



apiRouter.use('/products', require('./products'));

apiRouter.use('/orders', require('./order'));

apiRouter.use('/order_products', require('./order_products'))


module.exports = apiRouter;
