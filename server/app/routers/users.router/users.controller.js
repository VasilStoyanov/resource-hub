const jwt = require('jwt-simple');
const { tap, map, flatMap, reduce } = require('rxjs/operators');
const { of } = require('rxjs/observable/of');
const { from } = require('rxjs/observable/from');
const { fromPromise } = require('rxjs/observable/fromPromise');
const jwtConfig = require('./../../config').jwt;
const { validateUserBm } = require('./users.helpers');

const {
  createAuthResponse, createUserEntity, userToViewModel, hashPassword,
} = require('./users.helpers');

const {
  PROPERTY_ALREADY_IN_USE,
  USERNAME_NOT_FOUND,
  USERID_NOT_FOUND,
  INCORRECT_PASSWORD,
  DEFAULT_SALT_LENGTH,
} = require('./users.constants');

const { getStatusCode } = require('../../../utils');
const { validateUser } = require('./users.validation');


const conflictStatusCode = getStatusCode('conflict');
const unauthorizedStatusCode = getStatusCode('unauthorized');
const badRequestStatusCode = getStatusCode('badRequest');

const checkForUniqueFields = ['username', 'email'];

const init = (data) => {
  const usersController = Object.create(null);

  usersController.createNewUserRx = user => (
    of(user)
      .pipe(
        tap(validateUserBm(validateUser)),
        flatMap(userObj => from(checkForUniqueFields)
          .pipe(
            flatMap(uniqueFieldName => fromPromise(data.users.exists({
              property: uniqueFieldName,
              value: userObj[uniqueFieldName] }))
              .pipe(tap((exists) => {
                if (exists) {
                  throw {
                    errorMessage: PROPERTY_ALREADY_IN_USE({
                      property: uniqueFieldName,
                      value: userObj[uniqueFieldName] }),
                    statusCode: conflictStatusCode };
                }
              }))),
            reduce(() => userObj),
          )),
        map(createUserEntity),
        flatMap(userEntity => data.users.create(userEntity)),
        map(userToViewModel),
      )
  );

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

  usersController.loginExistingUserRx = usersCredentials => (
    of(usersCredentials)
      .pipe(
        tap(validateUserBm(validateUser)),
        flatMap(({ username, password }) => fromPromise(data.users.getByUsername(username))
          .pipe(
            tap((user) => {
              if (!user) {
                throw { statusCode: unauthorizedStatusCode,
                  errorMessage: USERNAME_NOT_FOUND(username) };
              }
            }),
            flatMap(user => fromPromise(data.users.checkPassword({ username, password }))
              .pipe(
                tap(({ validPassword }) => {
                  if (!validPassword) {
                    throw { statusCode: unauthorizedStatusCode,
                      errorMessage: INCORRECT_PASSWORD };
                  }
                }),
                map(() => jwt.encode({ id: user.userId }, jwtConfig.secret)),
                map(token => createAuthResponse({ token, user })),
              )),
          )),
      )
  );

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

  usersController.changeExistingUsersPasswordRx = usersData => (
    of(usersData)
      .pipe(
        flatMap(({ userId, oldPassword, newPassword }) =>
          fromPromise(data.users.getByUserId(userId))
            .pipe(
              tap((user) => {
                if (!user) {
                  throw { statusCode: unauthorizedStatusCode,
                    errorMessage: USERID_NOT_FOUND(userId) };
                }
              }),
              flatMap(user => fromPromise(data.users.checkPassword({ username: user.username, password: oldPassword }))
                .pipe(
                  tap(({ validPassword }) => {
                    if (!validPassword) {
                      throw { statusCode: unauthorizedStatusCode,
                        errorMessage: INCORRECT_PASSWORD };
                    }
                  }),
                  map(() => ({ userId, newPassword })),
                )),
            )),
        flatMap(({ userId, newPassword }) => {
          const { hashingResult, salt } = hashPassword(DEFAULT_SALT_LENGTH)(newPassword);

          return fromPromise(data.users.updateOneByProperty({
            selector: 'userId',
            match: userId,
            propertyToUpdate: 'hashedPwd',
            newValue: hashingResult,
          }))
            .pipe(flatMap(() => fromPromise(data.users.updateOneByProperty({
              selector: 'userId',
              match: userId,
              propertyToUpdate: 'salt',
              newValue: salt,
            }))));
        }),
      )
  );

  usersController.changeExistingUsersPassword = async ({
    userId, oldPassword, newPassword,
  }) => {
    try {
      const { validPassword } = await data.users.checkPassword({ userId, password: oldPassword });
      if (!validPassword) {
        return Promise.reject({ errorMessage: 'Wrong current password' });
      }
    } catch (exception) {
      return Promise.reject({ errorMessage: exception });
    }

    const { hashingResult, salt } = hashPassword(DEFAULT_SALT_LENGTH)(newPassword);

    try {
      await data.users.updateOneByProperty({
        selector: 'userId',
        match: userId,
        propertyToUpdate: 'hashedPwd',
        newValue: hashingResult,
      });

      await data.users.updateOneByProperty({
        selector: 'userId',
        match: userId,
        propertyToUpdate: 'salt',
        newValue: salt,
      });

      return Promise.resolve();
    } catch (exception) {
      return Promise.reject({ errorMessage: exception });
    }
  };

  return Object.freeze(usersController);
};

module.exports = { init };
