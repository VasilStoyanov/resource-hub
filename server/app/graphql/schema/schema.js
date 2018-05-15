const { createError } = require('apollo-errors');
const { createUserEntity } = require('./../../routers/users.router/users.helpers');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

const createGraphQLSchema = ({ app, data }) => {
  const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
      id: {
        type: GraphQLString,
        resolve: ({ _id }) => _id,
      },
      username: { type: GraphQLString },
      email: { type: GraphQLString },
      creationDateTimestamp: { type: GraphQLString },
    }),
  });

  const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    fields: {
      getUserById: {
        type: UserType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (root, { id }) => data.users.getByObjectId(id),
      },
      getUserByUsername: {
        type: UserType,
        args: {
          username: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (root, { username }) => data.users.getUserByUsername(username),
      },
    },
  });

  const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    fields: {
      registerUser: {
        type: UserType,
        description: 'Registers a new user',
        args: {
          user: {
            name: 'user',
            type: {
              username
            },
          },
        },
        resolve: async (root, user) => {
          const userEntity = createUserEntity(user);
          const createdUser = await data.users.create(userEntity);
          return createdUser;
        },
      },
    },
  });

  return new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
  });
};

module.exports = { createGraphQLSchema };
