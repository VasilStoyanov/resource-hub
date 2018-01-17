const topicController = require('./topic.controller');
const { Router } = require('express');
const { getStatusCode } = require('./../../../utils');
const { requireAuthentication } = require('./../../auth/auth');

const createdStatusCode = getStatusCode('created');
const okStatusCode = getStatusCode('ok');
const notFoundStatusCode = getStatusCode('notFound');
const badRequestStatusCode = getStatusCode('badRequest');

const DB_ERROR_MESSAGE =
  'There was a problem processing your request. Please check all fields and retry.';

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

  router.post('/topic', requireAuthentication(), async (req, res) => {
    const topic = req.body;

    try {
      const createdTopic = await controller.create(topic);
      res.status(createdStatusCode).json(createdTopic);
    } catch ({
      statusCode = badRequestStatusCode,
      errorMessage = DB_ERROR_MESSAGE
    }) {
      console.log(errorMessage);
      res.status(statusCode).json({ message: errorMessage });
    }
  });

  app.use(routerPrefix, router);
};

module.exports = { attachTo };
