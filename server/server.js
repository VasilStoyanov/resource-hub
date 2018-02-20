const {
  logMessage,
  logWarnMessage,
  logErrorMessage,
} = require('./utils');

const config = require('./config');
const databaseLayer = require('./db');
const dataLayer = require('./data');
const applicationLayer = require('./app');

const SERVER_INITIALIZATION_MESSAGE = ({ initialized, port = config.PORT }) => (
  initialized ?
    `> Server running on localhost:${port}` :
    '(!) Server initialization aborted'
);

const startServerAsync = () => Promise.resolve();

startServerAsync()
  .then(() => databaseLayer.init({
    connectionString: config.connectionString,
    dataSource: config.dataSources('resourceHub'),
  }))
  .then(db => dataLayer.init(db))
  .then(data => applicationLayer.init(data))
  .then(app => app.listen(config.PORT, () => {
    logMessage(SERVER_INITIALIZATION_MESSAGE({
      initialized: true,
      port: config.PORT,
    }));
  }))
  .catch((errorMessage) => {
    logErrorMessage(`${errorMessage}`);
    logWarnMessage(SERVER_INITIALIZATION_MESSAGE({ initialized: false }));
    process.exit();
  });
