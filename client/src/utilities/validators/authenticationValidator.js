import Validate from './validate';

const ERROR_MESSAGES = {
  USERNAME_IS_REQUIRED: 'Username is required!',
  EMAIL_IS_REQUIRED: 'Email is required!',
  PASSWORD_IS_REQUIRED: 'Password is required!',
  REPEAT_PASSWORD_IS_REQUIRED: 'Repeat password is required!',
  REPEAT_PASSWORD_IS_DOESNT_MATCH: 'Repeat password doesn\'t match!',
};

const AUTHENTICATION_VALUES_VALIDATIONS = {
  username: (value) => {
    if (!value || typeof value !== 'string' || value.length <= 2) {
      return ERROR_MESSAGES.USERNAME_IS_REQUIRED;
    }

    return undefined;
  },
  password: (value) => {
    if (!value || typeof value !== 'string' || value.length <= 2) {
      return ERROR_MESSAGES.PASSWORD_IS_REQUIRED;
    }

    return undefined;
  },
};

const REGISTER_VALUES_VALIDATIONS = {
  ...AUTHENTICATION_VALUES_VALIDATIONS,
  email: (value) => {
    if (!value || typeof value !== 'string' || value.length <= 2) {
      return ERROR_MESSAGES.EMAIL_IS_REQUIRED;
    }

    return undefined;
  },
  confirmPassword: (value, values) => {
    if (!value || typeof value !== 'string' || value.length <= 2) {
      return ERROR_MESSAGES.REPEAT_PASSWORD_IS_REQUIRED;
    }
    if (value !== values.password) {
      return ERROR_MESSAGES.REPEAT_PASSWORD_IS_DOESNT_MATCH;
    }

    return undefined;
  },
};

const LOGIN_VALUES_VALIDATIONS = {
  ...AUTHENTICATION_VALUES_VALIDATIONS,
};


export const registerValidation = Validate(REGISTER_VALUES_VALIDATIONS);
export const loginValidation = Validate(LOGIN_VALUES_VALIDATIONS);
