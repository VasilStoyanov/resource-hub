/* eslint-disable prefer-promise-reject-errors, consistent-return */

const jwt = require('jwt-simple');
const jwtConfig = require('./../../config').jwt;
const { getStatusCode } = require('./../../../utils');

const unauthorizedStatusCode = getStatusCode('unauthorized');
const badRequestStatusCode = getStatusCode('badRequest');

const USERNAME_NOT_FOUND = username => `Username ${username} does not exist`;
const INCORRECT_PASSWORD = 'Incorrect password';
const USERNAME_IS_REQUIRED_ERROR_MESSAGE = 'Username is required';
const PASSWORD_IS_REQUIRED_ERROR_MESSAGE = 'Password is required';


const createAuthResponse = ({ token, user }) => ({
  token,
  user: {
    id: user.userId,
    username: user.username,
  },
});

const init = (app, data) => {
  const authContorller = Object.create(null);

  authContorller.login = ({ username, password }) => new Promise((resolve, reject) => {
    if (!username || typeof username !== 'string') {
      return reject({
        statusCode: badRequestStatusCode,
        errorMessage: USERNAME_IS_REQUIRED_ERROR_MESSAGE,
      });
    } else if (!password || typeof password !== 'string') {
      return reject({
        statusCode: badRequestStatusCode,
        errorMessage: PASSWORD_IS_REQUIRED_ERROR_MESSAGE,
      });
    }

    data.users.getByUsername(username)
      .then((user) => {
        if (user) {
          return data.users.checkPassword({ username, password });
        }

        return reject({
          statusCode: unauthorizedStatusCode,
          errorMessage: USERNAME_NOT_FOUND(username),
        });
      })
      .then(({ user, validPassword }) => {
        if (validPassword) {
          const payload = {
            id: user.userId,
          };

          const token = jwt.encode(payload, jwtConfig.secret);
          const authResponse = createAuthResponse({ token, user });
          return resolve(authResponse);
        }

        return reject({
          statusCode: unauthorizedStatusCode,
          errorMessage: INCORRECT_PASSWORD,
        });
      })
      .catch(dbErrorMsg => reject({
        statusCode: badRequestStatusCode,
        errorMessage: dbErrorMsg,
      }));
  });

  return authContorller;
};

module.exports = { init };
