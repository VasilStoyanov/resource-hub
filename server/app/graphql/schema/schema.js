const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql")

const createGraphQLSchema = ({ app, data }) => {
  const User = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
      id: { type: GraphQLString },
      username: { type: GraphQLString },
      email: { type: GraphQLString },
      creationDateTimestamp: { type: GraphQLString },
    })
  });

  const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      user: {
        type: User,
        args: {
          id: { type: GraphQLString },
          username: { type: GraphQLString },
        },
        resolve: (root, args) => data.users.getByUsername(args.username)
      }
    }
  });

  return new GraphQLSchema({
    query: RootQuery
  });
};

module.exports = { createGraphQLSchema };