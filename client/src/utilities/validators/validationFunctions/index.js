const MESSAGES = {
  REQUIRED: '{propName} is required!',
  MIN_LENGTH: '{propName} mimum length is {minLength}!',
  MAX_LENGTH: '{propName} maximum length is {maxLength}!',
  MATCH_REGEX: '{propName} has incorrect format!',
  MATCHES: '{propName} must match {comparableName}!',
  VALIDATE_ARRAY: {
    NOT_ARRAY: '{propName} has to be array!',
    NOT_UNIQUE: 'Not unique',
  },
};

function required(isRequired, value) {
  if (isRequired && (!value || value.length <= 0)) {
    return MESSAGES.REQUIRED;
  }
}

function minLength(minLengthVal, value) {
  if (value && minLengthVal > value.length) {
    return MESSAGES.MIN_LENGTH.replace('{minLength}', minLengthVal);
  }
}

function maxLength(maxLengthVal, value) {
  if (value && maxLengthVal < value.length) {
    return MESSAGES.MAX_LENGTH.replace('{maxLength}', maxLengthVal);
  }
}

function matchRegex(regexString, value) {
  const regex = new RegExp(regexString);
  if (!regex.test(value)) {
    return MESSAGES.MATCH_REGEX;
  }
}

function matches(comparableName, value, values) {
  if (values[comparableName] !== value) {
    return MESSAGES.MATCHES;
  }
}

export default {
  required,
  maxLength,
  matchRegex,
  matches,
  minLength,
};
