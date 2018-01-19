const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');

const jwt = {
  secret: 'J4V4$CR1PTD4B3$T',
  session: {
    session: false
  }
};

const applyTo = (app) => {
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const staticsPath = path.join(__dirname, './../../../client/dist/');
  app.use('/', express.static(staticsPath));
};

module.exports = {
  applyTo,
  jwt
};
