
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import topicsReducer from './topicsReducer';
import formReducers from './formReducers';

export default combineReducers({
    form: formReducers,
    authReducer,
    topicsReducer
});