import { combineEpics } from 'redux-observable';
import { loginUserEpic } from './login/';
import { getTopicsEpic } from './topics';

export const rootEpic = combineEpics(
    loginUserEpic,
    getTopicsEpic
  );

export default rootEpic;

