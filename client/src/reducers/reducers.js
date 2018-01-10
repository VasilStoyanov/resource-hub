
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import formReducers from './formReducers';

export default combineReducers({
    form: formReducers,
    authReducer
});
