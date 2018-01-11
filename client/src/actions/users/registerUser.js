import { URLS } from '../../constants/UserConstants';
import { post } from '../../data/data';

const registerUser = (userData) => {
    const userRegisterURL = URLS.REGISTER;
    
    return {
        type: 'REGISTER',
        payload: post(userRegisterURL, userData)
    };
};

export default registerUser;
