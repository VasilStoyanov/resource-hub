const topicController = require('./topic.controller');
const { Router } = require('express');
const { getStatusCode } = require('./../../../utils');
const { authenticate } = require('./../../auth/auth');

const createdStatusCode = getStatusCode('created');
const okStatusCode = getStatusCode('ok');
const notFoundStatusCode = getStatusCode('notFound');

const attachTo = (app, data) => {
  const router = new Router();
  const routerPrefix = '/api';

  const controller = topicController.init(app, data);

  router.get('/topic', (req, res) => {
    controller.getTopics()
      .subscribe({
        next: (topicsCollection) => res.status(okStatusCode).json(topicsCollection),
        error: () => res.sendStatus(notFoundStatusCode)
      });
  });

  router.get('/topic/:id', (req, res) => {
    const topicId = req.params.id;

    controller.getTopicById(topicId)
      .subscribe({
        next: (topic) => res.status(okStatusCode).json(topic),
        error: () => res.sendStatus(notFoundStatusCode)
      });
  });

  router.post('/topic', authenticate(), async (req, res) => {
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
