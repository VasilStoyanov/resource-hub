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
    REGISTER: 'auth/signup',
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout'
};
