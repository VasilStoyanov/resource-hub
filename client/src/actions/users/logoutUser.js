import { URLS } from '../../constants/UserConstants';
import { post } from '../../data/data';

const logoutUser = (userToken) => {
    const userLogoutURL = URLS.LOGOUT;
    
    return {
        type: 'LOGOUT',
        payload: post(userLogoutURL, userToken)
    };
};

export default logoutUser;
