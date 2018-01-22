import { Observable } from 'rxjs';
import { post } from '../../data';
import { URLS } from '../../constants/UserConstants';
import { loginUserFulfilled,
       loginUserRejected,
       registerUserFulfilled,
       registerUserRejected, } from '../../actions/users/';

export const loginUserEpic = action$ =>
  action$.ofType('LOGIN')
    .mergeMap(action =>
      post(`${URLS.LOGIN}`, action.payload)
        .map(response => loginUserFulfilled(response))
        .catch(error => Observable.of(loginUserRejected(error)))
    );

export const registerUserEpic = action$ =>
  action$.ofType('REGISTER')
    .mergeMap(action =>
      post(`${URLS.REGISTER}`, action.payload)
        .map(response => registerUserFulfilled(response))
        .catch(error => Observable.of(registerUserRejected(error)))
    );

