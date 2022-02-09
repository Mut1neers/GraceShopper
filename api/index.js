const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here

//apiRouter.get("/users")
//apiRouter.get("/orders")
//apiRouter.get("/orders")

apiRouter.use('/products', require('./products'));
apiRouter.use('/orders', require('./orders'));
module.exports = apiRouter;
