import { toast } from 'react-toastify';
import Auth from '../authentication/Auth';
import { UserActions, Messages } from '../constants/UserConstants';

const initialState = {
    authenticated: Auth.isUserAuthenticated(),
    currentUser: Auth.getAuthenticatedUser(),
    token: Auth.getToken()
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UserActions.LOGIN.FULFILLED: {
            toast(Messages.SUCCESSFULLY_LOGIN, { className: 'green-toast' });

            Auth.authenticateUser(action.payload.token, action.payload.user);

            return {
                authenticated: true,
                currentUser: action.payload.user,
                token: action.payload.token
            };
        }
        case UserActions.LOGIN.REJECTED: {
            toast(action.payload.error || Messages.UNSUCCESSFULLY_LOGIN, { className: 'red-toast' });

            Auth.deauthenticateUser();

            return { authenticated: false };
        }
        case UserActions.LOGOUT.FULFILLED: {
            toast(Messages.SUCCESSFULLY_LOGOUT, { className: 'green-toast' });

            Auth.deauthenticateUser();

            return { authenticated: false };
        }
        case UserActions.LOGOUT.REJECTED: {
            toast(action.payload.error || Messages.UNSUCCESSFULLY_LOGOUT, { className: 'red-toast' });

            Auth.deauthenticateUser();

            return { authenticated: false };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
