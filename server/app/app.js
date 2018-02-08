const express = require('express');
const appConfig = require('./config');
const routers = require('./routers');
const authentication = require('./authentication/authentication');
const authorization = require('./authorization/authorization');
const path = require('path');

const PATH_TO_INDEX_HTML = path.join(
  __dirname,
  '../../client/dist/index.html',
);

const init = async (data) => {
  const app = express();

  appConfig.applyTo(app);
  authentication.applyTo(app, data);
  authorization.applyTo(app, data);
  routers.attachTo(app, data);

  app.get('/*', (req, res) => {
    res.sendFile(PATH_TO_INDEX_HTML);
  });

  return app;
};

module.exports = { init };
