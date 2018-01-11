const jwt = require('passport-jwt');
const jwtConfig = require('./../../config').jwt;
const { getStatusCode } = require('./../../../utils');

const unauthorizedStatusCode = getStatusCode('unauthorized');
const USERNAME_NOT_FOUND = (username) => `Username ${username} does not exist`;
const INCORRECT_PASSWORD = 'Incorrect password';

const init = (app, data) => {
  const authContorller = Object.create(null);

  authContorller.login = ({ username, password }) => new Promise((resolve, reject) => {
    console.log('here baby');
    data.users.getOneByUsername(username)
      .then(user => {
        if (user) {
          return data.users.checkPassword({ username, password });
        }

        return reject({
          statusCode: unauthorizedStatusCode,
          errorMessage: USERNAME_NOT_FOUND(username)
        });
      })
      .then(({ user, validPassword }) => {
        if (validPassword) {
          const payload = {
            id: user.id
          };

          const token = jwt.encode(payload, jwtConfig.secret);
          return resolve(token);
        }

        return reject({
          statusCode: unauthorizedStatusCode,
          errorMessage: INCORRECT_PASSWORD
        });
      });
  });
};

module.exports = { init };
