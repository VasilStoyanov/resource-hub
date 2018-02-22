const usersController = require('./users.controller');
const { getStatusCode } = require('./../../../utils');
const { Router } = require('express');

const usersRouter = new Router();

const createdStatusCode = getStatusCode('created');
const badRequestStatusCode = getStatusCode('badRequest');
const okStatusCode = getStatusCode('ok');

const attachTo = (app, data) => {
  const controller = usersController.init(data);
  const routerPrefix = '/users';

  usersRouter.post('/register', async (req, res) => {
    const user = req.body;

    try {
      const createdUser = await controller.createNewUser(user);
      res.status(createdStatusCode).json(createdUser);
    } catch ({ statusCode = badRequestStatusCode, errorMessage }) {
      res.status(statusCode).json({ errorMessage });
    }
  });

  usersRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const token = await controller.loginExistingUser({ username, password });
      res.status(okStatusCode).json(token);
    } catch ({ statusCode, errorMessage }) {
      res.status(statusCode).json({ message: errorMessage });
    }
  });

  app.use(routerPrefix, usersRouter);
};

module.exports = { attachTo };
