
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import topicsReducer from './topicsReducer';
import formReducers from './formReducers';
import resourcesReducer from './resourcesReducer';
import requestsReducer from './requestsReducer';
import paginationReducer from './paginationReducer';

export default combineReducers({
  form: formReducers,
  authReducer,
  topicsReducer,
  resourcesReducer,
  requestsReducer,
  paginationReducer,
});
