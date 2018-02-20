const config = require('./config');
const databaseLayer = require('./db');
const dataLayer = require('./data');
const applicationLayer = require('./app');
const { logMessage, logWarnMessage, logErrorMessage } = require('./utils');

const SERVER_INITIALIZATION_MESSAGE = ({ initialized, port = config.PORT }) => (
  initialized ?
    `> Server running on localhost:${port}` :
    '(!) Server initialization aborted'
);

(async () => {
  try {
    const db = await databaseLayer.init({
      connectionString: config.connectionString,
      dataSource: config.dataSources('resourceHub'),
    });

    const data = await dataLayer.init(db);
    const app = await applicationLayer.init(data);

    app.listen(config.PORT, () => {
      logMessage(SERVER_INITIALIZATION_MESSAGE({ initialized: true }));
    });
  } catch (errorMessage) {
    logErrorMessage(`${errorMessage}`);
    logWarnMessage(SERVER_INITIALIZATION_MESSAGE({ initialized: false }));
    process.exit();
  }
})();
