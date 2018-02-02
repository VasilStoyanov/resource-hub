const express = require('express');
const appConfig = require('./config');
const routers = require('./routers');
const auth = require('./auth');
const path = require('path');

const PATH_TO_INDEX_HTML = path.join(__dirname, '../../client/dist/index.html');

const init = (data) => {
  const app = express();

  appConfig.applyTo(app);
  auth.applyTo(app, data);
  routers.attachTo(app, data);

  app.get('/*', (req, res) => {
    res.sendFile(PATH_TO_INDEX_HTML);
  });

  data.users.updateUsername({ userId: '9daa21f0-fb8e-11e7-8c72-e993596a0dd5', newUsername: 'shestka' })
    .then(r => console.log(r))
    .catch(e => console.log(e));

  return Promise.resolve(app);
};

module.exports = { init };
