export const Messages = {
    SUCCESSFULLY_LOGIN: 'Successfully login!',
    UNSUCCESSFULLY_LOGIN: 'Wrong username or password!',
    SUCCESSFULLY_LOGOUT: 'Successfully logout!',
    UNSUCCESSFULLY_LOGOUT: 'Not authenticated!'
};

export const UserActions = {
    REGISTER: {
        FULFILLED: 'REGISTER_FULFILLED',
        REJECTED: 'REGISTER_REJECTED',
    },
    LOGIN: {
        FULFILLED: 'LOGIN_FULFILLED',
        REJECTED: 'LOGIN_REJECTED'
    },
    LOGOUT: {
        FULFILLED: 'LOGOUT_FULFILLED',
        REJECTED: 'LOGOUT_REJECTED'
    }
};

export const URLS = {
    REGISTER: '/auth/signup',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout'
};
