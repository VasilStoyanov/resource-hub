export const registerUser = (userData) => ({
        type: 'REGISTER',
        payload: userData
    });

export const registerUserFulfilled = (payload) => ({
    type: 'REGISTER_FULFILLED',
    payload
});

export const registerUserRejected = (payload) => ({
    type: 'REGISTER_REJECTED',
    payload
});

export const loginUser = (userCredentials) => ({
    type: 'LOGIN',
    payload: userCredentials
});

export const loginUserRejected = (payload) => ({
    type: 'LOGIN_REJECTED',
    payload
});

export const loginUserFulfilled = (payload) => ({
    type: 'LOGIN_FULFILLED',
    payload
});

