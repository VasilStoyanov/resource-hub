const config = require('./config');
const databaseLayer = require('./db');
const dataLayer = require('./data');
const applicationLayer = require('./app');
const { logger } = require('./utils');

const SERVER_INITIALIZED_MESSAGE = (port) => (
  `> Server running on localhost:${port}`
);

const logToConsole = logger({
  printer: console,
  method: 'info',
  colour: 'green'
});

const startServerAsync = () => Promise.resolve();

startServerAsync()
  .then(() => databaseLayer.init({
    connectionString: config.connectionString,
    dataSource: config.dataSources('Agatha')
  }))
  .then(db => dataLayer.init(db))
  .then(data => applicationLayer.init(data))
  .then(app => app.listen(config.PORT, () => {
    logToConsole(SERVER_INITIALIZED_MESSAGE(config.PORT));
  }))
  .catch(exeption => console.error(exeption));
