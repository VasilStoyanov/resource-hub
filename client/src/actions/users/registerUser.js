import axios from 'axios';
import { URLS } from '../../constants/UserConstants';

const registerUser = (userData) => {
    const userRegisterURL = URLS.REGISTER;
    
    return {
        type: 'REGISTER',
        payload: axios.post(userRegisterURL, userData)
    };
};

export default registerUser;
