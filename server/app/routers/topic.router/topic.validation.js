const TOPIC_MODEL_CONSTANTS = require('./../../../models/topic.model/topic.model.constants');
const THEMATIC_MODEL_CONSTANTS = require('./../../../models/thematic.model/thematic.model.constants');

const {
  failedValidation,
  is,
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
const topicThematicsDesiredType = 'array';

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
  }

  return passedValidation();
};

module.exports = validateTopic;
