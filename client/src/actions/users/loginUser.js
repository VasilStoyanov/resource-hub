import axios from 'axios';
import { URLS } from '../../constants/UserConstants';

const loginUser = (userCredentials) => {
    const userLoginURL = URLS.LOGIN;
    
    return {
        type: 'LOGIN',
        payload: axios.post(userLoginURL, userCredentials)
    };
};

export default loginUser;
