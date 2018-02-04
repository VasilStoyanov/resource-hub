const { createModelValidator } = require('./../model.validator.factory.js');
const createSchema = require('./../schema.factory');

const {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  SALT_MAX_LENGTH,
  SALT_MIN_LENGTH,
  USER_EMAIL_MAX_LENGTH,
  USER_EMAIL_MIN_LENGTH,
} = require('./user.model.constants');

const userUniqueFields = ['userId', 'username', 'email'];
const userModelValidationRules = {
  userId: {
    required: true,
    type: 'string',
  },
  username: {
    maxLength: USERNAME_MAX_LENGTH,
    minLength: USERNAME_MIN_LENGTH,
    required: true,
    type: 'string',
  },
  hashedPwd: {
    required: true,
    type: 'string',
  },
  salt: {
    maxLength: SALT_MAX_LENGTH,
    minLength: SALT_MIN_LENGTH,
    required: true,
    type: 'string',
  },
  email: {
    maxLength: USER_EMAIL_MAX_LENGTH,
    minLength: USER_EMAIL_MIN_LENGTH,
    required: true,
    type: 'string',
  },
  creationDateTimestamp: {
    required: true,
    type: 'number',
  },
};

const userValidationSchema = createSchema.forModel('user')(userModelValidationRules);
const userModelValidator = createModelValidator(userValidationSchema);

module.exports = {
  userModelValidator,
  userValidationSchema,
  userUniqueFields,
};
