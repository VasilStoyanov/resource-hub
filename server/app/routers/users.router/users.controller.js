const jwt = require('jwt-simple');
const jwtConfig = require('./../../config').jwt;

const { getStatusCode } = require('../../../utils');
const { validateUser } = require('./users.validation');
const { createAuthResponse, createUserEntity, userToViewModel } = require('./users.helpers');
const { PROPERTY_ALREADY_IN_USE, USERNAME_NOT_FOUND, INCORRECT_PASSWORD } = require('./users.constants');

const conflictStatusCode = getStatusCode('conflict');
const unauthorizedStatusCode = getStatusCode('unauthorized');
const badRequestStatusCode = getStatusCode('badRequest');

const checkForUniqueFields = ['username', 'email'];

const init = (data) => {
  const usersController = Object.create(null);

  usersController.createNewUser = async (user) => {
    const validationResult = validateUser(user);
    if (!validationResult.isValid) {
      return Promise.reject({ errorMessage: validationResult.message });
    }

    for (let i = 0; i < checkForUniqueFields.length; i += 1) {
      const uniqueFieldName = checkForUniqueFields[i];

      try {
        const exists = await data.users.exists({
          property: uniqueFieldName,
          value: user[uniqueFieldName],
        });

        if (exists) {
          return Promise.reject({
            statusCode: conflictStatusCode,
            errorMessage: PROPERTY_ALREADY_IN_USE({
              property: uniqueFieldName,
              value: user[uniqueFieldName],
            }),
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

  usersController.loginExistingUser = async ({ username, password }) => {
    const validationResult = validateUser({ username, password });
    if (!validationResult.isValid) {
      return Promise.reject({
        statusCode: badRequestStatusCode,
        errorMessage: validationResult.message,
      });
    }

    try {
      const user = await data.users.getByUsername(username);
      if (!user) {
        return Promise.reject({
          statusCode: unauthorizedStatusCode,
          errorMessage: USERNAME_NOT_FOUND(username),
        });
      }

      const { validPassword } = await data.users.checkPassword({ username, password });
      if (validPassword) {
        const payload = {
          id: user.userId,
        };

        const token = jwt.encode(payload, jwtConfig.secret);
        const authResponse = createAuthResponse({ token, user });

        return authResponse;
      }

      return Promise.reject({
        statusCode: unauthorizedStatusCode,
        errorMessage: INCORRECT_PASSWORD,
      });
    } catch (exception) {
      return Promise.reject({
        statusCode: badRequestStatusCode,
        errorMessage: exception,
      });
    }
  };

  return Object.freeze(usersController);
};

module.exports = { init };
