const PORT = 3000;
const connectionString = 'mongodb://localhost:27017/';
const environment = process.env.NODE_ENV;
/*
  Key of new data sources should be lower case, while the value should
  be the exact name as is.
*/

const dataSources = (name) => {
  const dataSourcesList = {
    resourceHub: 'ResourceHub',
  };

  return dataSourcesList[name];
};

module.exports = {
  PORT,
  connectionString,
  dataSources,
  environment,
};
