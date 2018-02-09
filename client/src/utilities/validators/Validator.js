function validate(values, validationFunctions, validationModel) {
    const errors = {};
    const keys = Object.keys(validationModel);        

    keys.forEach(key => {
        const validationPropertiesKeys = Object.keys(validationModel[key]);

        validationPropertiesKeys.forEach(valPropKey => {
            const valFunction = validationFunctions[valPropKey];
            const errorMessage = valFunction(validationModel[key][valPropKey], values[key], values);
            
            if (Array.isArray(errorMessage)) {
                errors[key] = errorMessage;
            } else if (errorMessage) {
                const propName = key[0].toLocaleUpperCase() + key.slice(1);
                errors[key] = errorMessage.replace('{propName}', propName);
            }            
        });
    });


    return errors;
}

class Validator {
    constructor(validationModel) {
        this.validationFunctions = {
            validateArray: (validationSchema, array) => {
                const errors = [];

                if (!Array.isArray(array)) {
                    return '{propName} has to be array!';
                }
                
                for (let i = 0; i < array.length && array[i]; i++) {
                     const keys = Object.keys(validationSchema);
                     const memberErrors = {};

                     for (let j = 0; j < keys.length; j++) {
                        const valKey = Object.keys(array[i])[0];
                        const err = this.validationFunctions[keys[j]](validationSchema[keys[j]], array[i][valKey]);
                        if (err) {
                            // errors.push(err.replace('{propName}', 'thematic')); 
                            memberErrors[valKey] = 'error!';
                        }
                     }
                     errors.push(memberErrors);
                }

                if (errors.length > 0) {
                    return errors;
                }
            },
            required: (isRequired, value) => {
                if (isRequired && (!value || value.length <= 0)) {
                    return '{propName} is required!';
                }
            },
            minLength: (minLength, value) => {
                if (value && minLength > value.length) {
                    return `{propName} mimum length is ${minLength}!`;
                }
            },
            maxLength: (maxLength, value) => {
                if (value && maxLength < value.length) {
                    return `{propName} maximum length is ${maxLength}!`;
                }
            },
            matchRegex: (regexString, value) => {
                const regex = new RegExp(regexString);
                if (!regex.test(value)) {
                    return '{propName} has incorrect format!';
                }
            },
            matches: (comparableName, value, values) => {
                if (values[comparableName] !== value) {
                    return `{propName} must match ${comparableName}!`;
                }
            }
        };
        
        this.validationModel = validationModel;
    }
    
    set validationModel(value) {
        const arrayProperties = {};
        const properties = {};

        if (!value || Object.keys(value).length <= 0) {
            throw new Error('The ValidationModel that you provided is invalid!');
        }
        const keys = Object.keys(value);
        keys.forEach(key => {
            const propKeys = Object.keys(value[key]);
            if (propKeys.length <= 0) {
                throw new Error(`The property ${key} of the ValidationModel that you provided is invalid!`);
            }
            if (value[key].isArray) {
                arrayProperties[key] = value[key];    
            } else {
                properties[key] = value[key];
            }
            propKeys.forEach(propKey => {
                if (!this.validationFunctions[propKey]) {
                    throw new Error(`The property ${key} of the ValidationModel contains nonexistent validation function ${propKey}!`);
                }
            });
        });

        this.vModel = {
            arrayProperties,
            properties
        };
    }

    get validationModel() {
        return this.vModel;
    }

    validate(values) {
       return validate(values, this.validationFunctions, this.validationModel.properties);
    }
}

export default Validator;
