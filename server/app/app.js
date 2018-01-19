const express = require('express');
const appConfig = require('./config');
const routers = require('./routers');
const auth = require('./auth');

const init = (data) => {
  const app = express();

  appConfig.applyTo(app);
  auth.applyTo(app, data);
  routers.attachTo(app, data);

  return Promise.resolve(app);
};

module.exports = { init };
