class Validator {
    constructor(values) {
        this.valuesValidations = values;
    }

    validate(values) {
        const errors = {};
        const keys = Object.keys(this.valuesValidations);
        keys.forEach(key => {
            const validationFunction = this.valuesValidations[key];
            const errorMessage = validationFunction(values[key], values);
            
            if (errorMessage) {
                errors[key] = errorMessage;
            }            
        });


        return errors;
    }
}

export default Validator;
