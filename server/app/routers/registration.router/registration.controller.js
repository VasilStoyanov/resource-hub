const {
  hash,
  generateSalt,
  validator,
} = require('../../../utils');

const uuidv1 = require('uuid/v1');
const { userValidationSchema } = require('./../../../models/user.model/user.model');

const USER_PASSWORD_MIN_LENGTH = 6;
const USER_PASSWORD_MAX_LENGTH = 40;
const userRegistrationRules = {
  password: {
    required: true,
    type: 'string',
    minLength: USER_PASSWORD_MIN_LENGTH,
    maxLength: USER_PASSWORD_MAX_LENGTH
  }
};

const userRegistrationSchema = {
  username: userValidationSchema.getRule('username'),
  ...userRegistrationRules
};

const userModelFields = userValidationSchema.getFields();

const init = (data) => {
  const userRegistrationController = Object.create(null);

  userRegistrationController.registerNewUser = async (user) => {
    const validationResult = validator.validate(user).using(userRegistrationSchema);
    if (!validationResult.isValid) {
      return Promise.reject(validationResult.message);
    }

    const userSalt = generateSalt({ length: 16 });
    const hashPassword = hash(user.password);
    const { hashingResult, salt } = hashPassword(userSalt);

    const userId = uuidv1();

    const userEntity = userModelFields.reduce((acc, curr) => {
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
      salt
    });

    return await data.users.create(userEntity);
  };

  return userRegistrationController;
};

module.exports = { init };
