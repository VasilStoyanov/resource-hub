const topicController = require('./topic.controller');
const { Router } = require('express');
const { getStatusCode } = require('./../../../utils');

const createdStatusCode = getStatusCode('created');
const okStatusCode = getStatusCode('created');

const attachTo = (app, data) => {
  const router = new Router();
  const routerPrefix = '/api';

  const controller = topicController.init(app, data);

  router.get('/topic', async (req, res) => {
    try {
      const topics = await controller.getTopics();
      res.status(okStatusCode).json(topics);
    } catch ({ statusCode, errorMessage }) {
      res.status(statusCode).json({ message: errorMessage });
    }
  });

  router.get('/topic/:id', async (req, res) => {
    const topicId = req.params.id;

    try {
      const topic = await controller.getTopicById(topicId);
      res.status(okStatusCode).json(topic);
    } catch ({ statusCode, errorMessage }) {
      res.status(statusCode).json({ message: errorMessage });
    }
  });

  router.post('/topic', async (req, res) => {
    const topic = req.body;

    try {
      await controller.create(topic);
      res.sendStatus(createdStatusCode);
    } catch ({ statusCode, errorMessage }) {
      res.status(statusCode).json({ message: errorMessage });
    }
  });

  app.use(routerPrefix, router);
};

module.exports = { attachTo };
