const { validator } = require('./../../utils');
const createSchema = require('./../schema.factory');
const THEMATIC_MODEL_CONSTANTS = require('./thematic.model.constants');

const thematicUniqueFields = ['thematicId', 'name'];
const thematicModelValidationRules = {
  thematicId: {
    required: true,
    type: 'string'
  },
  name: {
    maxLength: THEMATIC_MODEL_CONSTANTS.NAME_MAX_LENGTH,
    minLength: THEMATIC_MODEL_CONSTANTS.NAME_MIN_LENGTH,
    required: true,
    type: 'string'
  },
  resources: {
    required: true,
    type: 'array'
  },
  creationDateTimestamp: {
    required: true,
    type: 'number'
  }
};

const thematicValidationSchema = createSchema.forModel('thematic')(thematicModelValidationRules);
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
  thematicUniqueFields
};
