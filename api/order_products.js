const express = require('express');
const orderProductsRouter = express.Router();

orderProductsRouter.use((req, res, next) => {
  console.log(`A request is being made to /order_products`);
  next();
});

orderProductsRouter.patch('/:orderProductId', requireUser, (req, res, next) => {
  try {
  } catch (error) {
    throw error;
  }
});

orderProductsRouter.delete();
