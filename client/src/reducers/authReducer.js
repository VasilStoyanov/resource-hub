import { UserActions } from '../constants/UserConstants';
import Auth from '../authentication/Auth';

const initialState = {
    authenticated: Auth.isUserAuthenticated(),
};

export default (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case UserActions.LOGIN.SUCCESS: {
            newState = {
                authenticated: true
            };
            break;
        }
        case UserActions.LOGIN.FAILURE: {
            newState = {
                authenticated: false
            };
            break;
        }
        case UserActions.LOGOUT.SUCCESS: {
            newState = {
                authenticated: false
            };
            break;
        }
        case UserActions.LOGOUT.FAILURE: {
            newState = {
                authenticated: true
            };
            break;
        }
        default: {
            newState = state;
        }
    }

    return newState;
};
