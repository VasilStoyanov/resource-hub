import validationFunctions from './validationFunctions/index';

function isUnique(arr, props) {
    var tmpArr = [];
    for (var obj in arr) {
        for (let i = 0; i < props.length; i++) {
            const prop = props[i];
            if (!arr[obj]) {
                continue;
            }
            if (tmpArr.indexOf(arr[obj][prop]) < 0) {
                tmpArr.push(arr[obj][prop]);
            } else {
                return false;
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
                    return;
                }
                if (!isUnique(array, unique)) {
                    return "Not unique."
                }
            }
        }
        this.validationModel = validationModel;
    }

    set validationModel(value) {
        // if (!value || Object.keys(value).length <= 0) {
        //     throw new Error('The ValidationModel that you provided is invalid!');
        // }
        // const keys = Object.keys(value);
        // keys.forEach(key => {
        //     const propKeys = Object.keys(value[key]);
        //     if (propKeys.length <= 0) {
        //         throw new Error(`The property ${key} of the ValidationModel that you provided is invalid!`);
        //     }
        //     propKeys.forEach(propKey => {
        //         if (!this.validationFunctions[propKey]) {
        //             throw new Error(`The property ${key} of the ValidationModel contains nonexistent validation function ${propKey}!`);
        //         }
        //     });
        // });

        this.vModel = value;
    }

    get validationModel() {
        return this.vModel;
    }

    validateArray(array, key) {
        const errors = [];
        const {unique, ...validationModel} = this.validationModel[key];
        const validator = new Validator(validationModel);

        if(unique){
            const tmpArr = [];
            for (const i in array) {
                const obj = array[i];        
                if(!obj){
                    continue;
                }
                for (const j in unique) {
                    const prop = unique[j];
                    if(tmpArr.indexOf(obj[prop]) < 0){
                        tmpArr.push(obj[prop]);
                        
                        const error = validator.validate(obj);
                        if(error){
                            errors.push(error);
                        }
                    }else{
                        errors.push({thematic: "Thematic has to be unique."});
                    }
                }
            }
        }else{   
            for (const key in array) {
                const error = validator.validate(array[key] || {});
                if (error) {
                    errors.push(error);
                }
            }
        }

        return errors;
    }

    validateObject(values, key) {
        const validationPropertiesKeys = Object.keys(this.validationModel[key]);
        let errorMessages = '';

        validationPropertiesKeys.forEach(valPropKey => {
            const validationFunction = this.validationFunctions[valPropKey];
            const errorMessage = validationFunction ? validationFunction(this.validationModel[key][valPropKey], values[key], values) : undefined;

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

        keys.forEach(key => {
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