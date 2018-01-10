const { validator } = require('./../../utils');
const createSchema = require('./../schema.factory');
const TOPIC_MODEL_CONSTANTS = require('./topic.model.constants');
const {
  thematicModelValidationRules
} = require('../thematicModelValidator/thematicModelValidator');

const topicModelValidationRules = {
  id: {
    required: true,
    type: 'string',
    unique: true
  },
  name: {
    maxLength: TOPIC_MODEL_CONSTANTS.NAME_MAX_LENGTH,
    minLength: TOPIC_MODEL_CONSTANTS.NAME_MIN_LENGTH,
    required: true,
    type: 'string',
    unique: true
  },
  thematics: {
    required: true,
    validationPredicate: (thematicsCollection) => {
      if (!Array.isArray(thematicsCollection) || thematicsCollection.length < 1) {
        return false;
      }

      for (let i = 0; i < thematicsCollection.length; i++) {
        const currentThematicObj = thematicsCollection[i];

        if (typeof currentThematicObj !== 'object') {
          return false;
        }

        return validator.validate(currentThematicObj)
          .using(thematicModelValidationRules)
          .isValid;
      }

      return true;
    }
  },
  isDeleted: {
    required: true,
    type: 'boolean'
  }
};

const topicUniqueFields = Object.keys(topicModelValidationRules)
  .filter(key => topicModelValidationRules[key].unique);

const topicValidationSchema = createSchema(topicModelValidationRules);
const topicSchema = topicValidationSchema.get();

const topicModelValidator = (model) => {
  const validationResult = validator.validate(model).using(topicSchema);

  if (!validationResult.isValid) {
    return Promise.reject(validationResult.message);
  }

  return Promise.resolve({ isValid: true });
};

module.exports = {
  topicModelValidator,
  topicValidationSchema,
  topicModelValidationRules,
  topicUniqueFields
};
