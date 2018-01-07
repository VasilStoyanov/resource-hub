const { MongoClient } = require('mongodb');
const { logger } = require('./../utils');

const CONNECTION_TO_DATABASE_FAILED_ERROR_MESSAGE = (message) =>
  (message ?
    `> Connection to database failed, message: ${message}` :
    '> Connection to database failed');

const CONNECTION_TO_DATABASE_SUCCESSFUL_MESSAGE = ({ connectionString, dataSource }) =>
  `> Database connected on: ${connectionString}, Data Source: ${dataSource}`;

const init = async ({ connectionString, dataSource }) => {
  try {
    const client = await MongoClient.connect(`${connectionString}`);
    const db = await client.db(dataSource);
    successfulConnectionToDb({ connectionString, dataSource });
    return Promise.resolve(db);
  } catch (ex) {
    failedConnectionToDb(ex.message);
    return Promise.resolve();
  }
};

const successfulConnectionToDb = ({ connectionString, dataSource }) => {
  logger({
    printer: console,
    method: 'info',
    colour: 'green'
  })(CONNECTION_TO_DATABASE_SUCCESSFUL_MESSAGE({
    connectionString,
    dataSource
  }));
};

const failedConnectionToDb = (message) => {
  logger({
    printer: console,
    method: 'error',
    colour: 'red'
  })(CONNECTION_TO_DATABASE_FAILED_ERROR_MESSAGE(message));
};

module.exports = { init };
