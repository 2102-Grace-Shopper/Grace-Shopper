const apiRouter = require('express').Router();
const dogsRouter = require('./dogs')


apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});



apiRouter.use('/products', require('./products'));

apiRouter.use('/orders', require('./order'));

apiRouter.use('/order_products', require('./order_products'))

apiRouter.use('/dogs', dogsRouter);



module.exports = apiRouter;
