const express = require('express');
const appConfig = require('./config');
const routers = require('./routers');
const auth = require('./auth');
const path = require('path');


const init = (data) => {
  const app = express();

  appConfig.applyTo(app);
  auth.applyTo(app, data);
  routers.attachTo(app, data);

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });

  return Promise.resolve(app);
};

module.exports = { init };
