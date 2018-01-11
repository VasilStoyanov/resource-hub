import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import { URLS } from '../constants/UserConstants';
import loginUserFulfilled from '../actions/users/loginUserFulfilled';
import loginUserRejected from '../actions/users/loginUserRejected';

export const loginUser = action$ =>
  action$.ofType('LOGIN')
    .mergeMap(action =>
      ajax.post(`${URLS.LOGIN}`, action.payload)
        .map(response => loginUserFulfilled(response))
        .catch(error => Observable.of(loginUserRejected(error)))
    );

export default loginUser;
