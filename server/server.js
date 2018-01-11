const {
  debug,
  logMessage,
  logWarnMessage,
  logErrorMessage
} = require('./utils');

global.debug = debug;

const config = require('./config');
const databaseLayer = require('./db');
const dataLayer = require('./data');
const applicationLayer = require('./app');

const SERVER_INITIALIZED_MESSAGE = (port) => (
  `> Server running on localhost:${port}`
);

const startServerAsync = () => Promise.resolve();

startServerAsync()
  .then(() => databaseLayer.init({
    connectionString: config.connectionString,
    dataSource: config.dataSources('resourceHub')
  }))
  .then(db => dataLayer.init(db))
  .then(data => applicationLayer.init(data))
  .then(app => app.listen(config.PORT, () => {
    logMessage(SERVER_INITIALIZED_MESSAGE(config.PORT));
  }))
  .catch(errorMessage => {
    logErrorMessage(`${errorMessage}`);
    logWarnMessage('(!) Server initialization aborted');
    process.exit();
  });
