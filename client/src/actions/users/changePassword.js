export const changePassword = ({ oldPassword, newPassword }) => ({
    type: 'CHANGE_PASSWORD',
    payload: { oldPassword, newPassword }
});

export default changePassword;
