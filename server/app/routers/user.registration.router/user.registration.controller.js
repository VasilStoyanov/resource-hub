const {
  hash,
  generateSalt,
  validator,
} = require('../../../utils');

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

const init = (data) => {
  const userRegistrationController = Object.create(null);

  userRegistrationController.registerNewUser = async (user) => {
    const validationResult = validator.validate(user).using(userRegistrationSchema);
    if (!validationResult.isValid) {
      return Promise.reject(validationResult.message);
    }

    const salt = generateSalt({ length: 16 });
    const hashPassword = hash(user.password);
    const passwordHashingResult = hashPassword(salt);

    return await data.users.add({
      ...user,
      hashedPwd: passwordHashingResult.hashedPassword,
      salt: passwordHashingResult.salt
    });
  };

  return userRegistrationController;
};

module.exports = { init };
