const express = require('express');
const usersRouter = express.Router();
const { requireUser } = require('../db/util');
const { getAllUsers, getUser, createUser } = require('../db/models/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

usersRouter.use((req, res, next) => {
  console.log(` A request is being made to /users`);
  next();
});

usersRouter.get('/', async (req, res) => {
  const users = await getAllUsers();
  console.log('USERS: ', users);
  res.send(users);
});

usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: 'MissingCredentialError',
      message: 'Please supply both a username and password',
    });
  }

  try {
    const user = await getUser({ username, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        JWT_SECRET
      );
      res.send({
        message: "You're logged in!",
        token,
      });
    } else {
      next({
        name: 'IncorrectCredentialError',
        message: 'Username or password is incorrect',
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

usersRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: 'MissingRegisterInfoError',
      message: 'Please supply all fields',
    });
  } else {
    try {
      const _user = await getUser(username);

      if (_user) {
        res.status(401);
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists',
        });
      }

      if (password.length < 8) {
        res.status(401);
        next({
          name: 'PasswordLengthError',
          message: 'Password too short!',
        });
      } else {
        const user = await createUser({
          username,
          password,
        });
        if (!user) {
          next({
            name: 'UserCreationError',
            message: 'Error creating user!',
          });
        } else {
          res.send({ user: user });
        }
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
});

usersRouter.get('/me', requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.error('User is not authorized!', error);
    next({
      name: 'UnauthorizedAccessError',
      message: 'User is not authorized',
    });
  }
});

module.exports = usersRouter