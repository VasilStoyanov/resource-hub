const { pipe, hash } = require('./../../utils');
const { CRUD, createUniqueFields, exists, aggregation } = require('./../factories/data.factory');
const {
  userModelValidator,
  userUniqueFields,
  USERS_COLLECTION_NAME,
  USERS_USERNAME_COLUMN_NAME,
} = require('./../../models/user.model/user.model');

const fetchUserData = obj => ({
  ...obj,
  getByUsername: username => (
    obj.getOneByFieldName(USERS_USERNAME_COLUMN_NAME)(username)
  ),
  getByUserId: id => obj.getOneByFieldName('userId')(id),
});

const modifyUserData = obj => ({
  ...obj,
  updateUsername: async ({ userId, newUsername }) => {
    try {
      const { result } = await obj.updateOneByProperty({
        selector: 'userId',
        match: userId,
        propertyToUpdate: USERS_USERNAME_COLUMN_NAME,
        newValue: newUsername,
      });

      return { modifiedObjects: result.nModified };
    } catch (ex) {
      return Promise.reject(ex);
    }
  },
});

const checkUserPassword = obj => ({
  ...obj,
  checkPassword: async ({ userId, username, password }) => {
    if (!userId && !username) {
      return Promise.reject('Provide userId or username selector');
    } else if (!password) {
      return Promise.reject('Provide password');
    }

    const user = userId ?
      await obj.getByUserId(userId) :
      await obj.getByUsername(username);

    const hashPassword = hash(password);
    const { hashingResult } = hashPassword(user.salt);
    const validPassword = hashingResult === user.hashedPwd;

    return {
      user,
      validPassword,
    };
  },
});

const init = async (db) => {
  const createdUniqueUserFields = createUniqueFields(db)(USERS_COLLECTION_NAME);

  try {
    await createdUniqueUserFields(userUniqueFields);
  } catch (exception) {
    return Promise.reject(exception);
  }

  const users = pipe(
    CRUD(db)(USERS_COLLECTION_NAME)(userModelValidator),
    aggregation(db)(USERS_COLLECTION_NAME),
    fetchUserData,
    modifyUserData,
    checkUserPassword,
    exists,
  )(Object.create(null));

  return Object.freeze({ users });
};

module.exports = { init };
