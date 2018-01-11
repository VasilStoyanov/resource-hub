const { validator, failedValidation, passedValidation, isArray } = require('./../../utils');
const createSchema = require('./../schema.factory');
const TOPIC_MODEL_CONSTANTS = require('./topic.model.constants');

const topicUniqueFields = ['id', 'name'];
const topicModelValidationRules = {
  id: {
    required: true,
    type: 'string'
  },
  name: {
    maxLength: TOPIC_MODEL_CONSTANTS.NAME_MAX_LENGTH,
    minLength: TOPIC_MODEL_CONSTANTS.NAME_MIN_LENGTH,
    required: true,
    type: 'string'
  },
  thematics: {
    required: true,
    validationPredicate: (thematicsCollection) => {
      if (!isArray(thematicsCollection).withLengthBiggerThan(0)) {
        return failedValidation(TOPIC_MODEL_CONSTANTS.TEMATICS_SHOULD_BE_ARRAY(1));
      }

      for (let i = 0; i < thematicsCollection.length; i++) {
        if (typeof thematicsCollection[i] !== 'string') {
          return failedValidation(TOPIC_MODEL_CONSTANTS.TEMATICS_VALUES_SHOULD_BE_OF_TYPE_STRING);
        }
      }

      return passedValidation();
    }
  }
};

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
  topicUniqueFields
};
