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
    return Promise.reject(CONNECTION_TO_DATABASE_FAILED_ERROR_MESSAGE(ex.message));
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

module.exports = { init };
