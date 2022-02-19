const express = require("express");
const {
  getAllOrders,
  createOrder,
  getCartByUser,
} = require("../db/models/orders");
const { addProductToOrder } = require("../db/models/order_products");
const { requireUser, requireAdmin } = require("../db/util");
const ordersRouter = express.Router();

ordersRouter.use((req, res, next) => {
  console.log(` A request is being made to /orders`);
  next();
});

ordersRouter.get("/", requireAdmin, async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
    console.log("ORDERS: ", orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/cart", requireUser, async (req, res, next) => {
  const userCart = await getCartByUser(req.user);
  try {
    if (userCart && userCart.status === "created") {
      res.send(userCart);
    }
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/", requireUser, async (req, res, next) => {
  const { status, userId, datePlaced } = req.body;
  //   const userId = req.user.id;
  try {
    const createdOrder = await createOrder({
      status: status,
      userId: userId,
      datePlaced: datePlaced,
    });
    if (createdOrder) {
      res.send(createdOrder);
    } else {
      next({
        name: "FailedToCreateOrder",
        message: "Error creating order!",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

ordersRouter.post("/:orderId/products", requireUser, async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const { productId, price, quantity } = req.body;
    const addedProduct = await addProductToOrder({
      orderId,
      productId,
      price,
      quantity,
    });
    if (addedProduct) {
      res.send(addedProduct);
    } else {
      next({
        name: "ErrorAddingProductToOrder",
        message: "Cannot add product to order",
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

module.exports = ordersRouter;
