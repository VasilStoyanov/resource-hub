import { combineEpics } from 'redux-observable';
import { loginUserEpic } from './login/';
import { getTopicsEpic } from './topics';
import { searchResourceEpic, getResourcesNames } from './resources';

export const rootEpic = combineEpics(
    loginUserEpic,
    getTopicsEpic,
    searchResourceEpic,
    getResourcesNames
  );

export default rootEpic;

