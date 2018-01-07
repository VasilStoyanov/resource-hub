const ERROR_MESSAGES = require('./data.validator.err.messages');

const passedValidation = () => ({ isValid: true });
const failedValidation = (message) => ({ isValid: false, message });
const property = (prop) => ({
  existsInObject: (obj) => (!!obj[prop]),
  isOfType: (type) => (typeof prop === type)
});

const isArray = (potentialArray) => {
  const result = Object.create(null);

  result.value = (potentialArray && Array.isArray(potentialArray));

  result.withLengthBiggerThan = (minLength) => (
    result.value && potentialArray.length > minLength
  );

  result.withLengthLessThan = (maxLength) => (
    result.value && potentialArray.length < maxLength
  );

  return result;
};

const is = (value) => ({
  lessThan: (secondValue) => (value < secondValue),
  lessOrEqualThan: (secondValue) => (value <= secondValue),
  greaterThan: (secondValue) => (value > secondValue),
  greaterOrEqualThan: (secondValue) => (value >= secondValue)
});

const validate = (obj) => ({
  usingSchema: (validationSchema) => {
    const schemaKeys = Object.keys(validationSchema);

    for (let i = 0; i < schemaKeys.length; i++) {
      const propName = schemaKeys[i];
      const currentRule = validationSchema[propName];

      if (currentRule.required && !property(propName).existsInObject(obj)) {
        return failedValidation(ERROR_MESSAGES.REQUIRED(propName));
      }

      if (currentRule.type && !property(obj[propName]).isOfType(currentRule.type)) {
        return failedValidation(ERROR_MESSAGES.INVALID_ARGUMENT(currentRule.type));
      }

      const minLength = currentRule.minLength;
      const maxLength = currentRule.maxLength;
      const currentObjLength = obj[propName].length;

      if (minLength && is(currentObjLength).lessThan(minLength)) {
        return failedValidation(ERROR_MESSAGES.INVALID_MIN_LENGTH(propName, minLength));
      }

      if (maxLength && is(currentObjLength).greaterThan(maxLength)) {
        return failedValidation(ERROR_MESSAGES.INVALID_MAX_LENGTH(propName, maxLength));
      }
    }

    return passedValidation();
  }
});

const validator = Object.create(null);

validator.validate = (obj) => ({
  using: (validationSchema) => {
    if (isArray(obj).value) {
      for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i] !== 'object') {
          return failedValidation(ERROR_MESSAGES.INVALID_ARGUMENT('object'));
        }

        const currentValidationResult = validate(obj[i]).usingSchema(validationSchema);
        if (!currentValidationResult.isValid) {
          return failedValidation(currentValidationResult.message);
        }
      }

      return passedValidation();
    }

    return validate(obj).usingSchema(validationSchema);
  }
});

module.exports = {
  validator,
};
