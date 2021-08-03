const apiRouter = require('express').Router();
const dogsRouter = require('./dogs');
const breedsRouter = require('./breeds');
const dog_breedRouter = require('./dog_breed');
const usersRouter = require('./users');
const orderRouter = require('./orders');
const productRouter = require('./products');
const orderProductRouter = require('./order_products');
const reviewsRouter = require('./reviews');

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.use('/dogs', dogsRouter);
apiRouter.use('/breeds', breedsRouter);
apiRouter.use('/dog_breed', dog_breedRouter);
// apiRouter.use('/users', usersRouter);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/order_products', orderProductRouter);
apiRouter.use('/reviews', reviewsRouter);

module.exports = apiRouter;