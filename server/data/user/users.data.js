const USERS_COLLECTION_NAME = 'users';

const { pipe, hash } = require('./../../utils');
const { userModelValidator, userUniqueFields } = require('./../../models/user.model/user.model');
const { CRUD, createUniqueFields, exists } = require('./../data.factory');

const fetchUserData = obj => ({
  ...obj,
  getByUsername: username => (
    obj.getOneByProperty('username')(username)
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
      })({
        propertyToUpdate: 'username',
        newValue: newUsername,
      });

      return { modifiedObjects: result.nModified };
    } catch (ex) {
      return ex;
    }
  },
});

const checkUserPassword = obj => ({
  ...obj,
  checkPassword: async ({ username, password }) => {
    const user = await obj.getByUsername(username);
    const hashPassword = hash(password);
    const { hashingResult } = hashPassword(user.salt);

    return Promise.resolve({
      user,
      validPassword: hashingResult === user.hashedPwd,
    });
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
