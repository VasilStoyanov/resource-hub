const express = require('express');
const appConfig = require('./config');
const routers = require('./routers');
const auth = require('./auth');
const path = require('path');

const PATH_TO_INDEX_HTML = path.join(
  __dirname,
  '../../client/dist/index.html',
);

const init = async (data) => {
  const app = express();

  appConfig.applyTo(app);
  auth.applyTo(app, data);
  routers.attachTo(app, data);

  app.get('/*', (req, res) => {
    res.sendFile(PATH_TO_INDEX_HTML);
  });

  return app;
};

module.exports = { init };
