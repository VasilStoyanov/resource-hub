const usersController = require('./users.controller');
const { getStatusCode } = require('./../../../utils');
const { Router } = require('express');
const { BAD_REQUEST_ERROR_MESSAGE } = require('./users.constants');
const { requireAuthentication } = require('./../../authentication');
const { allowForRoles } = require('./../../authorization/authorization');

const usersRouter = new Router();

const createdStatusCode = getStatusCode('created');
const badRequestStatusCode = getStatusCode('badRequest');
const okStatusCode = getStatusCode('ok');

const userFetchingAuthorizationMiddleware = [
  requireAuthentication(),
  allowForRoles('supervisor', 'admin'),
];

const attachTo = (app, data) => {
  const controller = usersController.init(data);
  const routerPrefix = '/users';

  usersRouter.get('/', userFetchingAuthorizationMiddleware, async (req, res) => {
    const { username, from, to } = req.query;

    controller.getUsers({ username, from, to })
      .subscribe(
        (foundUsers) => { res.status(okStatusCode).json(foundUsers); },
        (error) => { res.status(badRequestStatusCode).json(error); },
      );
  });

  usersRouter.post('/register', async (req, res) => {
    const user = req.body;

    try {
      const createdUser = await controller.createNewUser(user);
      res.status(createdStatusCode).json(createdUser);
    } catch ({ statusCode = badRequestStatusCode, errorMessage = BAD_REQUEST_ERROR_MESSAGE }) {
      res.status(statusCode).json({ errorMessage });
    }
  });

  usersRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const token = await controller.loginExistingUser({ username, password });
      res.status(okStatusCode).json(token);
    } catch ({ statusCode = badRequestStatusCode, errorMessage = BAD_REQUEST_ERROR_MESSAGE }) {
      res.status(statusCode).json({ errorMessage });
    }
  });

  usersRouter.put('/changepassword', requireAuthentication(), async (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    try {
      await controller.changeExistingUsersPassword({
        userId, oldPassword, newPassword,
      });

      res.sendStatus(okStatusCode);
    } catch ({ statusCode = badRequestStatusCode, errorMessage = BAD_REQUEST_ERROR_MESSAGE }) {
      res.status(statusCode).json({ errorMessage });
    }
  });

  app.use(routerPrefix, usersRouter);
};

module.exports = { attachTo };

const thename = 'Andrew';
