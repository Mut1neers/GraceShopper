const express = require('express');
const {
  getOrderProductById,
  updateOrderProduct,
  destroyOrderProduct,
} = require('../db/models/order_products');
const { requireUser } = require('../db/util');
const orderProductsRouter = express.Router();

orderProductsRouter.use((req, res, next) => {
  console.log(`A request is being made to /order_products`);
  next();
});

orderProductsRouter.patch('/:orderProductId', requireUser, (req, res, next) => {
  try {
    const orderProductToUpdate = await getOrderProductById(req.params.orderProductId);
    const orderProductId = req.params.orderProductId;
    const { price, quantity } = req.body;
    if (!orderProductToUpdate) {
      next({
        name: 'ErrorGettingOrderProduct',
        message: 'No order found',
      });
    } else {
      const updatedOrderProduct = await updateOrderProduct({
        id: orderProductId,
        price,
        quantity,
      });
      res.send(updatedOrderProduct);
    }
  } catch (error) {
    throw error;
  }
});

orderProductsRouter.delete('/:orderProductId', requireUser, async (req, res, next) => {
  try {
    const deletedOrderProduct = await destroyOrderProduct(req.params.orderProductId);
    res.send(deletedOrderProduct);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

module.exports = orderProductsRouter;
