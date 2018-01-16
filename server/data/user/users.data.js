const USERS_COLLECTION_NAME = 'users';

const { pipe, hash } = require('./../../utils');
const { userModelValidator, userUniqueFields } = require('./../../models/user.model/user.model');
const { CRUD, createUniqueFields, exists } = require('./../data.factory');

const findByUsername = (obj) => ({
  ...obj,
  getByUsername: (username) => (
    obj.getOneByProperty('username')(username)
  )
});

const findUserById = (obj) => ({
  ...obj,
  getByUserId: (id) => obj.getOneByProperty('userId')(id)
});

const checkUserPassword = (obj) => ({
  ...obj,
  checkPassword: async ({ username, password }) => {
    const user = await obj.getByUsername(username);
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
    CRUD(db)(USERS_COLLECTION_NAME)(userModelValidator),
    findUserById,
    findByUsername,
    checkUserPassword,
    exists
  )(Object.create(null)));
};

module.exports = userData;
