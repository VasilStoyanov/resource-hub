const { validator } = require('./../../utils');
const createSchema = require('./../schema.factory');

const USER_MODEL_CONSTANTS = require('./user.model.constants');

const userUniqueFields = ['id', 'username'];
const userModelValidationRules = {
  id: {
    required: true,
    type: 'string'
  },
  username: {
    maxLength: USER_MODEL_CONSTANTS.USERNAME_MAX_LENGTH,
    minLength: USER_MODEL_CONSTANTS.USERNAME_MIN_LENGTH,
    required: true,
    type: 'string'
  },
  hashedPwd: {
    required: true,
    type: 'string'
  },
  salt: {
    maxLength: USER_MODEL_CONSTANTS.SALT_MAX_LENGTH,
    minLength: USER_MODEL_CONSTANTS.SALT_MIN_LENGTH,
    required: true,
    type: 'string'
  }
};

const userValidationSchema = createSchema(userModelValidationRules);
const userSchema = userValidationSchema.get();

const userModelValidator = (model) => {
  const validationResult = validator.validate(model).using(userSchema);

  if (!validationResult.isValid) {
    return Promise.reject(validationResult.message);
  }

  return Promise.resolve({ isValid: true });
};

module.exports = {
  userModelValidator,
  userValidationSchema,
  userUniqueFields
};
