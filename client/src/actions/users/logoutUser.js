import axios from 'axios';
import { URLS } from '../../constants/UserConstants';

const logoutUser = (userToken) => {
    const userLogoutURL = URLS.LOGOUT;
    
    return {
        type: 'LOGOUT',
        payload: axios.post(userLogoutURL, userToken)
    };
};

export default logoutUser;
