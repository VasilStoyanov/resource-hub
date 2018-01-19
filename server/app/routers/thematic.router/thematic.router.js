const thematicController = require('./thematic.controller');
const { getStatusCode } = require('./../../../utils');
const { Router } = require('express');

const okStatusCode = getStatusCode('ok');
const createdStatusCode = getStatusCode('created');

const attachTo = (app, data) => {
  const router = new Router();
  const routerPrefix = '/api';

  const controller = thematicController.init(app, data);

  router.get('/thematic', async (req, res) => {
    try {
      const thematics = await controller.getThematics();
      res.status(okStatusCode).json(thematics);
    } catch ({ statusCode, errorMessage }) {
      res.status(statusCode).json({ message: errorMessage });
    }
  });

  router.get('/thematic/:id', async (req, res) => {
    const thematicId = req.params.id;

    try {
      const thematic = await controller.getThematicById(thematicId);
      res.status(okStatusCode).json(thematic);
    } catch ({ statusCode, errorMessage }) {
      res.status(statusCode).json({ message: errorMessage });
    }
  });

  router.post('/thematic', async (req, res) => {
    const thematic = req.body;

    try {
      await controller.create(thematic);
      res.sendStatus(createdStatusCode);
    } catch ({ statusCode, errorMessage }) {
      res.status(statusCode).json({ message: errorMessage });
    }
  });

  app.use(routerPrefix, router);
};

module.exports = { attachTo };
