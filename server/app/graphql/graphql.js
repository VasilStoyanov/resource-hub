const expressGraphQL = require("express-graphql");
const DataLoader = require('dataloader');
const { createGraphQLSchema } = require("./schema");

const init = ({ app, data }) => {
  const schema = createGraphQLSchema({ app, data });

  app.use("/graphql", expressGraphQL({
    schema,
    graphiql: true
  }));
};

module.exports = { init };