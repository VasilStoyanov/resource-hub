import { UserActions } from '../constants/UserConstants';

export default (state, action) => {
    switch (action.type) {
        case UserActions.REGISTER.FULFILLED: {
            return null;
        }
        default: {
            return state;
        }
    }
};
