
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import topicsReducer from './topicsReducer';
import formReducers from './formReducers';
import resourcesReducer from './resourcesReducer';
import usersReducer from './usersReducer';
import requestsReducer from './requestsReducer';
import paginationReducer from './paginationReducer';
import dialogsReducer from './dialogsReducer';

export default combineReducers({
  form: formReducers,
  authReducer,
  topicsReducer,
  resourcesReducer,
  usersReducer,
  requestsReducer,
  paginationReducer,
  dialogsReducer,
});
