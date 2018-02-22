const uuidv1 = require('uuid/v1');
const { userValidationSchema } = require('./../../../models/user.model/user.model');
const { hash, generateSalt } = require('../../../utils');

const userModelFields = userValidationSchema.getFields();

const createAuthResponse = ({ token, user }) => ({
  token,
  user: {
    id: user.userId,
    username: user.username,
  },
});

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
      [curr]: user[curr],
    };

    return Object.assign(acc, userProperty);
  }, {
    userId,
    username: user.username,
    hashedPwd: hashingResult,
    salt,
    creationDateTimestamp,
  });

  return result;
};

const userToViewModel = user => ({
  id: user.userId,
  username: user.username,
});

module.exports = {
  createAuthResponse,
  createUserEntity,
  userToViewModel,
};
