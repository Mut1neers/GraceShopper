const express = require('express');
const { requireUser } = require('../db/util');
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
  console.log(` A request is being made to /users`);
  next();
});
