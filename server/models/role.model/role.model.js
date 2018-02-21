const { createModelValidator } = require('./../model.validator.factory');
const createSchema = require('./../schema.factory');

const { ROLE_NAME_MIN_LENGTH, ROLE_NAME_MAX_LENGTH, ROLES_COLLECTION_NAME } = require('./role.model.constants');

const roleUniqueFields = ['name'];
const roleModelValidationRules = {
  name: {
    maxLength: ROLE_NAME_MAX_LENGTH,
    minLength: ROLE_NAME_MIN_LENGTH,
    required: true,
    type: 'string',
  },
};

const roleValidationSchema = createSchema.forModel(ROLES_COLLECTION_NAME)(roleModelValidationRules);
const roleModelValidator = createModelValidator(roleValidationSchema);

module.exports = {
  roleModelValidator,
  roleValidationSchema,
  roleUniqueFields,
  ROLES_COLLECTION_NAME,
};
