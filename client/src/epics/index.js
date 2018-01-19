import { combineEpics } from 'redux-observable';
import { loginUserEpic, registerUserEpic } from './users/';
import { getTopicsEpic } from './topics';
import { searchResourceEpic, getResourcesNames, searchInputChange } from './resources';

export const rootEpic = combineEpics(
    loginUserEpic,
    registerUserEpic,
    getTopicsEpic,
    searchResourceEpic,
    getResourcesNames,
    searchInputChange
  );

export default rootEpic;

