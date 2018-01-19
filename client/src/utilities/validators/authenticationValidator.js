import Validate from './validate';

const ERROR_MESSAGES = {
    USERNAME_IS_REQUIRED: 'Username is required!',
    EMAIL_IS_REQUIRED: 'Email is required!',
    PASSWORD_IS_REQUIRED: 'Password is required!',
    REPEAT_PASSWORD_IS_REQUIRED: 'Repeat password is required!',
    REPEAT_PASSWORD_IS_DOESNT_MATCH: 'Repeat password doesn\'t match!'
};

const AUTHENTICATION_VALUES_VALIDATIONS = {
    username: value => {
        if (!value || typeof value !== 'string' || value.length <= 2) {
            return ERROR_MESSAGES.USERNAME_IS_REQUIRED;
        }
    },
    password: value => {
        if (!value || typeof value !== 'string' || value.length <= 2) {
            return ERROR_MESSAGES.PASSWORD_IS_REQUIRED;
        }
    }
};

const REGISTER_VALUES_VALIDATIONS = {
    ...AUTHENTICATION_VALUES_VALIDATIONS,
    email: value => {
        if (!value || typeof value !== 'string' || value.length <= 2) {
            return ERROR_MESSAGES.EMAIL_IS_REQUIRED;
        }
    },
    confirmPassword: (value, values) => {
        if (!value || typeof value !== 'string' || value.length <= 2) {
            return ERROR_MESSAGES.REPEAT_PASSWORD_IS_REQUIRED;
        }
        if (value !== values.password) {
            return ERROR_MESSAGES.REPEAT_PASSWORD_IS_DOESNT_MATCH;
        }
    }
};

const RegisterValidationModel = { 
    email: {
        required: true,
        minLength: 3,
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
