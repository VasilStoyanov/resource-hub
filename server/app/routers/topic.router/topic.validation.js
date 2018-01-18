const TOPIC_MODEL_CONSTANTS = require('./../../../models/topic.model/topic.model.constants');

const THEMATIC_MODEL_CONSTANTS =
  require('./../../../models/thematic.model/thematic.model.constants');

const {
  failedValidation,
  is,
  isArray,
  passedValidation,
  property
} = require('../../../utils');

const {
  REQUIRED,
  INVALID_MIN_LENGTH,
  INVALID_MAX_LENGTH,
  INVALID_ARGUMENT,
} = require('./../../../utils/validator/data.validator.err.messages');

const INVALID_TOPIC_OBJECT = 'Please provide a topic object';

const objName = 'topic';
const topicNameDesiredType = 'string';
const thematicsItemDesiredType = 'string';

const validateTopic = (topic) => {
  if (!topic || typeof topic !== 'object') {
    return failedValidation(INVALID_TOPIC_OBJECT);
  } else if (!property('name').in(topic).exists) {
    return failedValidation(REQUIRED({
      objName,
      propName: 'name'
    }));
  } else if (!property('name').in(topic).isOfType(topicNameDesiredType)) {
    return failedValidation(INVALID_ARGUMENT({
      objName,
      propName: 'name',
      desiredType: topicNameDesiredType
    }));
  } else if (is(topic.name.length).lessThan(TOPIC_MODEL_CONSTANTS.NAME_MIN_LENGTH)) {
    return failedValidation(INVALID_MIN_LENGTH({
      objName,
      propName: 'name',
      desiredMinLength: TOPIC_MODEL_CONSTANTS.NAME_MIN_LENGTH
    }));
  } else if (is(topic.name.length).greaterThan(TOPIC_MODEL_CONSTANTS.NAME_MAX_LENGTH)) {
    return failedValidation(INVALID_MAX_LENGTH({
      objName,
      propName: 'name',
      desiredMinLength: TOPIC_MODEL_CONSTANTS.NAME_MIN_LENGTH
    }));
  }

  if (!isArray(topic.thematics).withLengthBiggerThan(0)) {
    return failedValidation(TOPIC_MODEL_CONSTANTS.TEMATICS_SHOULD_BE_ARRAY(1));
  }

  for (let i = 0; i < topic.thematics.length; i++) {
    const currentThematic = topic.thematics[i];

    if (typeof currentThematic !== 'string') {
      return failedValidation(INVALID_ARGUMENT({
        objName,
        propName: `thematics[${i}]`,
        desiredType: thematicsItemDesiredType
      }));
    } else if (is(currentThematic.length).lessThan(THEMATIC_MODEL_CONSTANTS.NAME_MIN_LENGTH)) {
      return failedValidation(INVALID_MIN_LENGTH({
        objName,
        propName: `thematics[${i}]`,
        desiredMinLength: THEMATIC_MODEL_CONSTANTS.NAME_MIN_LENGTH
      }));
    } else if (is(currentThematic.length).greaterThan(THEMATIC_MODEL_CONSTANTS.NAME_MAX_LENGTH)) {
      return failedValidation({
        objName,
        propName: `thematics[${i}]`,
        desiredMaxLength: THEMATIC_MODEL_CONSTANTS.NAME_MAX_LENGTH
      });
    }
  }

  return passedValidation();
};

module.exports = { validateTopic };
