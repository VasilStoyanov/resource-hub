const { validator } = require('./../utils');
const createSchema = require('./schema.factory');

const USER_MODEL_CONSTANTS = require('./user.model.constants');

const userModelValidationRules = {
  username: {
    type: 'string',
    unique: true,
    required: true,
    minLength: USER_MODEL_CONSTANTS.USERNAME_MIN_LENGTH,
    maxLength: USER_MODEL_CONSTANTS.USERNAME_MAX_LENGTH
  },
  hashedPwd: {
    type: 'string',
    required: true
  },
  salt: {
    type: 'string',
    required: true,
    minLength: USER_MODEL_CONSTANTS.SALT_MIN_LENGTH,
    maxLength: USER_MODEL_CONSTANTS.SALT_MAX_LENGTH
  }
};

const userUniqueFields = Object.keys(userModelValidationRules)
  .filter(key => userModelValidationRules[key].unique);

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
  userModelValidationRules,
  userUniqueFields
};
