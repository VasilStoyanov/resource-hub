const USERS_COLLECTION_NAME = 'users';

const { pipe, hash } = require('./../../utils');
const { userModelValidator, userUniqueFields } = require('./../../models/user.model/user.model');
const { creatable, readable, createUniqueFields } = require('./../data.factory');

// eslint-disable-next-line no-unused-vars
const getOneByUsername = (db) => (collection) => (obj) => ({
  ...obj,
  getOneByUsername: (username) => (
    obj.getOneByProperty('username')(username)
  )
});

// eslint-disable-next-line no-unused-vars
const checkUserPassword = (db) => (collection) => (obj) => ({
  ...obj,
  checkPassword: async ({ username, password }) => {
    const user = await obj.getOneByUsername(username);
    const hashPassword = hash(password);
    const { hashedPassword } = hashPassword(user.salt);

    return Promise.resolve({
      user,
      validPassword: hashedPassword === user.hashedPwd
    });
  }
});

const userData = async (db) => {
  const createdUniqueUserFields = createUniqueFields(db)(USERS_COLLECTION_NAME);

  try {
    await createdUniqueUserFields(userUniqueFields);
  } catch (ex) {
    return Promise.reject(ex);
  }

  return Promise.resolve(pipe(
    creatable(db)(USERS_COLLECTION_NAME)(userModelValidator),
    readable(db)(USERS_COLLECTION_NAME),
    getOneByUsername(db)(USERS_COLLECTION_NAME),
    checkUserPassword(db)(USERS_COLLECTION_NAME)
  )(Object.create(null)));
};

module.exports = userData;
