const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db/models/user');
const { JWT_SECRET } = process.env;

apiRouter.get('/health', (req, res, next) => {
  try {
    res.send({
      healthy: true,
    });
  } catch (error) {
    next(error);
  }
});

apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);

      const id = parsedToken && parsedToken.id;
      if (id) {
        req.user = await getUserById(parsedToken.id);
        next();
      }
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});



// place your routers here

//apiRouter.get("/users")
//apiRouter.get("/orders")
//apiRouter.get("/orders")
apiRouter.use('/users', require('./users'));

apiRouter.use('/users', require('./users'));
apiRouter.use('/products', require('./products'));
apiRouter.use('/orders', require('./orders'));
module.exports = apiRouter;
