const express = require('express');
const appConfig = require('./config');
const routers = require('./routers');
const authentication = require('./authentication/authentication');
const path = require('path');

const PATH_TO_INDEX_HTML = path.join(
  __dirname,
  '../../client/dist/index.html',
);

const init = async (data) => {
  const app = express();
  console.log(data);
  appConfig.applyTo(app);
  authentication.applyTo(app, data);
  routers.attachTo(app, data);

  app.get('/*', (req, res) => {
    res.sendFile(PATH_TO_INDEX_HTML);
  });

  return app;
};

module.exports = { init };
