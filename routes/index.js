const apiRouter = require('express').Router();
const dogsRouter = require('./dogs');
const breedsRouter = require('./breeds');
const dog_breedRouter = require('./dog_breed');
const usersRouter = require('./users');
const ordersRouter = require('./orders');
const productsRouter = require('./products');
const order_productsRouter = require('./order_products');
const reviewsRouter = require('./reviews');

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.use('/dogs', dogsRouter);
// apiRouter.use('/breeds', breedsRouter);
// apiRouter.use('/dog_breed', dog_breedRouter);
// apiRouter.use('/users', usersRouter);
// apiRouter.use('/orders', ordersRouter);
// apiRouter.use('/products', productsRouter);
// apiRouter.use('/order_products', order_productsRouter);
// apiRouter.use('/reviews', reviewsRouter);

module.exports = apiRouter;