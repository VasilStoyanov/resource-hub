const { validator, failedValidation, passedValidation, isArray } = require('./../../utils');
const createSchema = require('./../schema.factory');
const {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  TEMATICS_SHOULD_BE_ARRAY
} = require('./topic.model.constants');

const topicUniqueFields = ['topicId', 'name'];
const topicModelValidationRules = {
  topicId: {
    required: true,
    type: 'string'
  },
  name: {
    maxLength: NAME_MAX_LENGTH,
    minLength: NAME_MIN_LENGTH,
    required: true,
    type: 'string'
  },
  thematics: {
    required: true,
    validationPredicate: (thematicsCollection) => {
      if (!isArray(thematicsCollection).withLengthBiggerThan(0)) {
        return failedValidation(TEMATICS_SHOULD_BE_ARRAY(1));
      }

      for (let i = 0; i < thematicsCollection.length; i++) {
        const currentThematicObject = thematicsCollection[i];
        if (typeof currentThematicObject !== 'object') {
          return failedValidation(
            "Expected thematic ID's to be passes as an object: { thmaticId: thematicId }"
          );
        }

        const currentThematicKeys = Object.keys(currentThematicObject);
        if (currentThematicKeys.length > 1 || currentThematicKeys[0] !== 'thematicId') {
          return failedValidation('Invalid thematic object.');
        } else if (!currentThematicObject.thematicId ||
          typeof currentThematicObject.thematicId !== 'string') {
          return failedValidation('Invalid value for thematicId object');
        }
      }

      return passedValidation();
    }
  }
};

const topicValidationSchema = createSchema.forModel('topic')(topicModelValidationRules);
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
