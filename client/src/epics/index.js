import { combineEpics } from 'redux-observable';
import loginUserEpic from './loginUser';

export const rootEpic = combineEpics(
    loginUserEpic
  );

export default rootEpic;

