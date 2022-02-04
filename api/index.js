const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./users");
const ordersRouter = require("./orders");
const productsRouter = require("./products");

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here

//apiRouter.get("/users")
//apiRouter.get("/orders")
//apiRouter.get("/orders")

apiRouter.use("/users", usersRouter);
apiRouter.use("/orders", require("./orders"));
apiRouter.use("/products", require("./products"));

module.exports = apiRouter;
