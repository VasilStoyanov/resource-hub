import { combineEpics } from 'redux-observable';
import { loginUserEpic } from './login/';
import { getTopicsEpic } from './topics';
import { changeEmailEpic } from './changeEmail';
import { changePasswordEpic } from './changePassword';
import { searchResourceEpic, getResourcesNames, searchInputChange } from './resources';

export const rootEpic = combineEpics(
    loginUserEpic,
    getTopicsEpic,
    searchResourceEpic,
    getResourcesNames,
    searchInputChange,
    changeEmailEpic,
    changePasswordEpic
  );

export default rootEpic;

