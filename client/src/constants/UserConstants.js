import { HttpPost, url } from './HttpConstants';

export const UserActions = {
    REGISTER: {
        SUCCESS: 'REGISTER_SUCCESS',
        FAILURE: 'REGISTER_FAILURE',
    },
    LOGIN: {
        SUCCESS: 'LOGIN_SUCCESS',
        FAILURE: 'LOGIN_FAILURE'
    },
    LOGOUT: {
        SUCCESS: 'LOGOUT_SUCCESS',
        FAILURE: 'LOGOUT_FAILURE'
    }
};

function generate(rest, reqType) {
    return Object.assign(Object.create(null), {
        ...reqType,
        url: `${url}${rest}`
    });
}

export const UserHttpRequests = {
    get REGISTER() { return generate('auth/signup', HttpPost); },
    get LOGIN() { return generate('auth/login', HttpPost); },
    get LOGOUT() { return generate('auth/logout', HttpPost); }
};
