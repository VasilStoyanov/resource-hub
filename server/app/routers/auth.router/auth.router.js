const authenticationController = require('./auth.controller');
const { Router } = require('express');

const attachTo = (app, data) => {
  const router = new Router();

  const routerPostfix = '/auth';
  const authController = authenticationController.init(app, data);

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
      const token = await authController.login({ username, password });
      res.json(token);
    } catch ({ statusCode, errorMessage }) {
      res.status(statusCode).json({ message: errorMessage });
    }
  });

  app.use(routerPostfix, router);
};

module.exports = { attachTo };
