const { validator } = require('./../../utils');
const createSchema = require('./../schema.factory');
const THEMATIC_MODEL_CONSTANTS = require('./thematic.model.constants');

const thematicUniqueFields = ['name'];
const thematicModelValidationRules = {
  name: {
    maxLength: THEMATIC_MODEL_CONSTANTS.NAME_MAX_LENGTH,
    minLength: THEMATIC_MODEL_CONSTANTS.NAME_MIN_LENGTH,
    required: true,
    type: 'string'
  }
};

const thematicValidationSchema = createSchema(thematicModelValidationRules);
const thematicSchema = thematicValidationSchema.get();

const thematicModelValidator = (model) => {
  const validationResult = validator.validate(model).using(thematicSchema);

  if (!validationResult.isValid) {
    return Promise.reject(validationResult.message);
  }

  return Promise.resolve({ isValid: true });
};

module.exports = {
  thematicModelValidator,
  thematicValidationSchema,
  thematicModelValidationRules,
  thematicUniqueFields
};
