import Validate from '../validate';

const RegisterValidationModel = { 
    email: {
        required: true,
        minLength: 3,
        // eslint-disable-next-line
        matchRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    username: {
        required: true,
        minLength: 3,
    },
    password: {
        required: true,
        minLength: 3,
    },
    confirmPassword: {
        required: true,
        minLength: 3,
        matches: 'password' 
    }
};
const LoginValidationModel = { 
    username: {
        required: true,
        minLength: 3,
    },
    password: {
        required: true,
        minLength: 3,
    }
};

export const registerValidation = Validate(RegisterValidationModel);
export const loginValidation = Validate(LoginValidationModel);
