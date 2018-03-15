const PORT = 3000;
const connectionString = 'mongodb://localhost:27017/';
const environment = process.env.NODE_ENV;
const operatingDataSourceName = 'ResourceHub';

module.exports = {
  PORT,
  connectionString,
  operatingDataSourceName,
  environment,
};
