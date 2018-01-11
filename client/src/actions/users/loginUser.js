import { URLS } from '../../constants/UserConstants';
import { post } from '../../data/data';

const loginUser = (userCredentials) => {
    const userLoginURL = URLS.LOGIN;
    
    return {
        type: 'LOGIN',
        payload: post(userLoginURL, userCredentials)
    };
};

export default loginUser;
