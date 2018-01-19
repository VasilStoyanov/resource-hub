class Validator {
    constructor(validationModel) {
        this.validationFunctions = {
            required: (isRequired, value) => {
                if (isRequired && (!value || value.length <= 0)) {
                    return '{propName} is required!';
                }
                return undefined;
            },
            minLength: (minLength, value) => {
                console.log(minLength, value);
                if (value && minLength > value.length) {
                    return `{propName} mimum length is ${minLength}!`;
                }
                return undefined;
            },
            matches: (comparableName, value, values) => {
                if (values[comparableName] !== value) {
                    return `{propName} must match ${comparableName}!`;
                }
                return undefined;
            }
        };
        
        this.validationModel = validationModel;
    }
    
    set validationModel(value) {
        if (!value || Object.keys(value).length <= 0) {
            throw new Error('The ValidationModel that you provided is invalid!');
        }
        const keys = Object.keys(value);
        keys.forEach(key => {
            const propKeys = Object.keys(value[key]);
            if (propKeys.length <= 0) {
                throw new Error(`The property ${key} of the ValidationModel that you provided is invalid!`);
            }
            propKeys.forEach(propKey => {
                if (!this.validationFunctions[propKey]) {
                    throw new Error(`The property ${key} of the ValidationModel contains nonexistent validation function ${propKey}!`);
                }
            });
        });

        this.vModel = value;
    }

    get validationModel() {
        return this.vModel;
    }

    validate(values) {
        const errors = {};
        const keys = Object.keys(this.validationModel);        

        keys.forEach(key => {
            const validationPropertiesKeys = Object.keys(this.validationModel[key]);

            validationPropertiesKeys.forEach(valPropKey => {
                const valFunction = this.validationFunctions[valPropKey];
                const errorMessage = valFunction(this.validationModel[key][valPropKey], values[key], values);
                    
                if (errorMessage) {
                    const propName = key[0].toLocaleUpperCase() + key.slice(1);
                    errors[key] = errorMessage.replace('{propName}', propName);
                }            
            });
        });


        return errors;
    }
}

export default Validator;
