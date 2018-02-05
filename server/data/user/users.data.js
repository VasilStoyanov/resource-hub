const USERS_COLLECTION_NAME = 'users';
const USERS_USERNAME_COLUMN_NAME = 'username';

const { pipe, hash } = require('./../../utils');
const { userModelValidator, userUniqueFields } = require('./../../models/user.model/user.model');
const { CRUD, createUniqueFields, exists } = require('./../data.factory');

const fetchUserData = obj => ({
  ...obj,
  getByUsername: username => (
    obj.getOneByProperty(USERS_USERNAME_COLUMN_NAME)(username)
  ),
  getByUserId: id => obj.getOneByProperty('userId')(id),
});

const modifyUserData = obj => ({
  ...obj,
  updateUsername: async ({ userId, newUsername }) => {
    try {
      const { result } = await obj.updateOneByProperty({
        findByProperty: 'userId',
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
  checkPassword: async ({ username, password }) => {
    const user = await obj.getByUsername(username);
    const hashPassword = hash(password);
    const { hashingResult } = hashPassword(user.salt);
    const validPassword = hashingResult === user.hashedPwd;

    return {
      user,
      validPassword,
    };
  },
});

const userData = async (db) => {
  const createdUniqueUserFields = createUniqueFields(db)(USERS_COLLECTION_NAME);

  try {
    await createdUniqueUserFields(userUniqueFields);
  } catch (ex) {
    return ex;
  }

  return pipe(
    CRUD(db)(USERS_COLLECTION_NAME)(userModelValidator),
    fetchUserData,
    modifyUserData,
    checkUserPassword,
    exists,
  )(Object.create(null));
};

module.exports = userData;
