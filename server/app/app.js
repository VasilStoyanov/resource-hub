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

  data.users.updateOneByProperty({
    findByProperty: 'userId',
    match: '36fca5f0-09e8-11e8-88e5-6d134d53351c',
    propertyToUpdate: 'email',
    newValue: 'b',
  })
    .then(r => console.log(r))
    .catch(e => console.log(`Error: ${e}`));

  return app;
};

module.exports = { init };
