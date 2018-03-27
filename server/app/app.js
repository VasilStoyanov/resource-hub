const express = require('express');
const appConfig = require('./config');
const routers = require('./routers');
const staticRouter = require('./statics/');
const authentication = require('./authentication/authentication');
const graphql = require("./graphql");

const init = async (data) => {
  const app = express();

  graphql.init({ app, data });
  appConfig.applyTo(app);
  authentication.applyTo(app, data);
  routers.attachTo(app, data);
  staticRouter.attachTo(app);

  return app;
};

module.exports = { init };