const uuidv1 = require('uuid/v1');
const { hash, generateSalt, getStatusCode } = require('../../../utils');
const { validateUser } = require('./registration.validation');

const { userValidationSchema } = require('./../../../models/user.model/user.model');

const conflictStatusCode = getStatusCode('conflict');

const userModelFields = userValidationSchema.getFields();

const PROPERTY_ALREADY_IN_USE = ({ property, value }) => (
  `${property} '${value}' is already in use`
);

const createUserEntity = (user) => {
  const userSalt = generateSalt({ length: 16 });
  const hashPassword = hash(user.password);
  const { hashingResult, salt } = hashPassword(userSalt);

  const userId = uuidv1();
  const creationDateTimestamp = Date.now();

  const result = userModelFields.reduce((acc, curr) => {
    if (!user[curr]) {
      return acc;
    }

    const userProperty = {
      [curr]: user[curr]
    };

    return Object.assign(acc, userProperty);
  }, {
    userId,
    username: user.username,
    hashedPwd: hashingResult,
    salt,
    creationDateTimestamp
  });

  return result;
};

const userToViewModel = (user) => ({
  id: user.userId,
  username: user.username
});

const init = (data) => {
  const userRegistrationController = Object.create(null);

  userRegistrationController.registerNewUser = async (user) => {
    const validationResult = validateUser(user);
    if (!validationResult.isValid) {
      return Promise.reject({ errorMessage: validationResult.message });
    }

    const checkForUniqueFields = ['username', 'email'];
    for (let i = 0; i < checkForUniqueFields.length; i++) {
      const uniqueFieldName = checkForUniqueFields[i];

      try {
        const exists = await data.users.exists({
          property: uniqueFieldName,
          value: user[uniqueFieldName]
        });

        if (exists) {
          return Promise.reject({
            statusCode: conflictStatusCode,
            errorMessage: PROPERTY_ALREADY_IN_USE({
              property: uniqueFieldName,
              value: user[uniqueFieldName]
            })
          });
        }
      } catch (errorMessage) {
        return Promise.reject({ errorMessage });
      }
    }

    const userEntity = createUserEntity(user);

    try {
      const createdUser = await data.users.create(userEntity);
      const userAsVM = userToViewModel(createdUser);
      return Promise.resolve(userAsVM);
    } catch (errorMessage) {
      return Promise.reject({ errorMessage });
    }
  };

  return userRegistrationController;
};

module.exports = { init };
