const changeEmail = ({ newEmail, password }) => ({
    type: 'CHANGE_EMAIL',
    payload: { newEmail, password }
});

export default changeEmail;
