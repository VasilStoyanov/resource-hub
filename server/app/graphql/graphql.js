const graphqlHTTP = require('express-graphql');
const DataLoader = require('dataloader');
const { createGraphQLSchema } = require('./schema');
const { formatError } = require('apollo-errors');

const init = ({ app, data }) => {
  const schema = createGraphQLSchema({ app, data });

  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
  );
};

module.exports = { init };
