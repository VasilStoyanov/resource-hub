import { combineEpics } from 'redux-observable';
import { loginUserEpic, registerUserEpic } from './users/';
import { getTopicsEpic } from './topics';
import { changeEmailEpic } from './changeEmail';
import { changePasswordEpic } from './changePassword';
import { searchResourceEpic, getResourcesNames, searchInputChange } from './resources';

export const rootEpic = combineEpics(
  loginUserEpic,
  registerUserEpic,
  getTopicsEpic,
  searchResourceEpic,
  getResourcesNames,
  searchInputChange,
  changeEmailEpic,
  changePasswordEpic,
);

export default rootEpic;

