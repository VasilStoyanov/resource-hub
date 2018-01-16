const {
  INVALID_ARGUMENT,
  INVALID_MAX_LENGTH,
  INVALID_MIN_LENGTH,
  REQUIRED,
  VALUE_CANNOT_BE_NAN
} = require('./data.validator.err.messages');

const passedValidation = () => ({ isValid: true });
const failedValidation = (message) => ({ isValid: false, message });

const property = (prop) => ({ in: (obj) => ({
    exists: !!obj[prop],
    isOfType: (type) =>
      ((type === 'array') ? Array.isArray(obj[prop]) :
        (typeof obj[prop] === type))
  })
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
    const objName = validationSchema.objName;

    for (let i = 0; i < schemaKeys.length; i++) {
      const propName = schemaKeys[i];
      const currentRule = validationSchema[propName];

      if (currentRule.required && !property(propName).in(obj).exists) {
        return failedValidation(REQUIRED({
          objName,
          propName
        }));
      }

      if (currentRule.type && !property(propName).in(obj).isOfType(currentRule.type)) {
        if (currentRule.type === 'number' && isNaN(obj[propName])) {
          return failedValidation(VALUE_CANNOT_BE_NAN({
            objName,
            propName
          }));
        }

        return failedValidation(INVALID_ARGUMENT({
          objName,
          propName,
          desiredType: currentRule.type
        }));
      }

      const minLength = currentRule.minLength;
      const maxLength = currentRule.maxLength;

      if (minLength && is(obj[propName].length).lessThan(minLength)) {
        return failedValidation(INVALID_MIN_LENGTH({
          objName,
          propName,
          desiredMinLength: minLength
        }));
      }

      if (maxLength && is(obj[propName].length).greaterThan(maxLength)) {
        return failedValidation(INVALID_MAX_LENGTH({
          objName,
          propName,
          desiredMaxLength: maxLength
        }));
      }

      if (currentRule.validationPredicate &&
        typeof currentRule.validationPredicate === 'function') {
        const validationResult = currentRule.validationPredicate(obj[propName]);
        if (!validationResult.isValid) {
          return failedValidation(validationResult.message);
        }
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
          return failedValidation(INVALID_ARGUMENT('object'));
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
  failedValidation,
  is,
  isArray,
  passedValidation,
  property,
  validator
};
