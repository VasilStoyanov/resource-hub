const ERROR_MESSAGES = Object.create(null);

ERROR_MESSAGES.REQUIRED = (valueName) => `${valueName} is required`;

ERROR_MESSAGES.INVALID_MIN_LENGTH = (name, requiredMinLength) => (
  `${name}'s length should NOT be less than ${requiredMinLength}!`
);

ERROR_MESSAGES.INVALID_MAX_LENGTH = (name, requiredMaxLength) => (
  `${name}'s length should be less than ${requiredMaxLength}!`
);

ERROR_MESSAGES.OUT_OF_RANGE = (name) => (requiredMinLength, requiredMaxLength) => (
  `${name}'s length should be at least
   ${requiredMinLength} and maximum ${requiredMaxLength} long!`
);

ERROR_MESSAGES.INVALID_VALIDATION_RULE = (name) => (
  `${name} does not have either 'minLength' or
  'maxLength' validation properties!`
);

ERROR_MESSAGES.INVALID_ARGUMENT = (type) => (
  `Expected argument to exist and to be of type: ${type}`
);

ERROR_MESSAGES.NO_VALIDATION_FUNCTIONS_PROVIDED = 'No validation functions were provided';
ERROR_MESSAGES.EXPECT_ARGUMENTS_TO_BE_ARRAY = (
  `At least one validation rule should be passed to the validation function
  and should be passed as an Array`
);

ERROR_MESSAGES.VALUE_CANNOT_BE_NAN = (valueName) => `${valueName} cannot be NaN!`;

module.exports = ERROR_MESSAGES;
