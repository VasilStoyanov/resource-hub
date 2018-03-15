const jwt = require('jwt-simple');
const { of } = require('rxjs/observable/of');
const { from } = require('rxjs/observable/from');
const { fromPromise } = require('rxjs/observable/fromPromise');
const jwtConfig = require('./../../config').jwt;
const { tap, map, flatMap, take, skip, reduce, startWith } = require('rxjs/operators');
const { validateUserBm } = require('./users.helpers');

const {
  createAuthResponse,
  createUserEntity,
  userToViewModel,
  hashPassword,
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

const checkForUniqueFields = ['username', 'email'];

const init = (data) => {
  const usersController = Object.create(null);

  usersController.getUsers = ({ username, usersToSkipCount = 0, usersToTakeCount = 1 }) => (
    fromPromise(data.users.aggregationPipeline({
      $match: {
        username: {
          $regex: `(.*${username}.*)`,
          $options: 'i',
        },
      },
    })
      .toArray())
      .pipe(
        flatMap(dbResult => from(dbResult)),
        skip(usersToSkipCount),
        take(usersToTakeCount),
        map(userToViewModel),
        startWith([]),
        reduce((acc, curr) => { acc.push(curr); return acc; }),
      )
  );


  usersController.createNewUser = user => (
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

  usersController.loginExistingUser = usersCredentials => (
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

  usersController.changeExistingUsersPassword = usersData => (
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

  return Object.freeze(usersController);
};

module.exports = { init };
