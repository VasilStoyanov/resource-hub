const express = require('express');
const appConfig = require('./config');
const routers = require('./routers');

const init = (data) => {
  const app = express();

  appConfig.applyTo(app);
  routers.attachTo(app, data);

  return Promise.resolve(app);
};

module.exports = { init };
