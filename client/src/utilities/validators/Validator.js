import validationFunctions from './validationFunctions/index';

function isUnique(arr, props) {
  const tmpArr = [];
  for (const obj in arr) {
    for (let i = 0; i < props.length; i += 1) {
      const prop = props[i];
      if (arr[obj]) {
        if (tmpArr.indexOf(arr[obj][prop]) < 0) {
          tmpArr.push(arr[obj][prop]);
        } else {
          return false;
        }
      }
    }
  }
  return true;
}

class Validator {
  constructor(validationModel) {
    this.validationFunctions = validationFunctions;

    this.arrValidationFunctions = {
      ...this.validationFunctions,
      unique: (unique, array) => {
        if (!Array.isArray(unique) || !Array.isArray(array)) {
          return undefined;
        }
        if (!isUnique(array, unique)) {
          return 'Not unique.';
        }

        return undefined;
      },
    };
    this.validationModel = validationModel;
  }

  set validationModel(value) {
    this.vModel = value;
  }

  get validationModel() {
    return this.vModel;
  }

  validateArray(array, key) {
    const errors = [];
    const { unique, ...validationModel } = this.validationModel[key];
    const validator = new Validator(validationModel);

    const tmpArr = [];
    for (const i in array) {
      const obj = array[i];
      for (const j in unique) {
        if (obj) {
          const prop = unique[j];
          if (obj && tmpArr.indexOf(obj[prop]) < 0) {
            tmpArr.push(obj[prop]);
          } else {
            errors[i] = { name: 'Thematic has to be unique.' };
          }
        }
      }
      const error = validator.validate(obj || {});
      if (error && Object.keys(error).length > 0) {
        if (errors[i]) {
          errors[i] = { ...errors[i], ...error };
        } else {
          errors[i] = error;
        }
      }
    }
    return errors;
  }

  validateObject(values, key) {
    const validationPropertiesKeys = Object.keys(this.validationModel[key]);
    let errorMessages = '';

    validationPropertiesKeys.forEach((valPropKey) => {
      const validationFunction = this.validationFunctions[valPropKey];
      const errorMessage = validationFunction ?
        validationFunction(this.validationModel[key][valPropKey], values[key], values) : undefined;

      if (errorMessage) {
        const propName = key[0].toLocaleUpperCase() + key.slice(1);
        errorMessages += errorMessage.replace('{propName}', propName);
      }
    });

    return errorMessages;
  }

  validate(value) {
    const errors = {};
    const keys = Object.keys(this.validationModel);

    keys.forEach((key) => {
      const error = Array.isArray(value[key]) ?
        this.validateArray(value[key], key) :
        this.validateObject(value, key);

      if (error) {
        errors[key] = error;
      }
    });


    return errors;
  }
}

export default Validator;
