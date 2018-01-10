import Validator from './Validator';

const Validate = valuesValidations => values => new Validator(valuesValidations).validate(values);


export default Validate;
