import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import { URLS } from '../../constants/UserConstants';
import { loginUserFulfilled,
       loginUserRejected,
       registerUserFulfilled,
       registerUserRejected, } from '../../actions/users/';

export const loginUserEpic = action$ =>
  action$.ofType('LOGIN')
    .mergeMap(action =>
      ajax.post(`${URLS.LOGIN}`, action.payload)
        .map(response => loginUserFulfilled(response))
        .catch(error => Observable.of(loginUserRejected(error)))
    );

export const registerUserEpic = action$ =>
  action$.ofType('REGISTER')
    .mergeMap(action =>
      ajax.post(`${URLS.REGISTER}`, action.payload)
        .map(response => registerUserFulfilled(response))
        .catch(error => Observable.of(registerUserRejected(error)))
    );

