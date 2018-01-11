const loginUser = (userCredentials) => ({
    type: 'LOGIN',
    payload: userCredentials
});

export default loginUser;
