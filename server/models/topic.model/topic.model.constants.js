const TOPIC_MODEL_CONSTANTS = Object.create(null);

TOPIC_MODEL_CONSTANTS.NAME_MIN_LENGTH = 3;
TOPIC_MODEL_CONSTANTS.NAME_MAX_LENGTH = 30;

TOPIC_MODEL_CONSTANTS.TEMATICS_SHOULD_BE_ARRAY = (minThematics) => (
  `Thematics should be passed as an array and should have at least ${minThematics} thematic!`
);

TOPIC_MODEL_CONSTANTS.TEMATICS_VALUES_SHOULD_BE_OF_TYPE_STRING =
  "Each value of the 'thematics' list, should be of type 'string'.";

module.exports = TOPIC_MODEL_CONSTANTS;
