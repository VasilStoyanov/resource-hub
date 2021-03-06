import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import { URLS } from '../../constants/UserConstants';
import loginUserFulfilled from '../../actions/users/loginUserFulfilled';
import loginUserRejected from '../../actions/users/loginUserRejected';

export const loginUserEpic = action$ =>
  action$.ofType('LOGIN')
    .mergeMap(action =>
      ajax.post(`${URLS.LOGIN}`, action.payload)
        .map(ajaxObj => loginUserFulfilled(ajaxObj.response))
        .catch(error => Observable.of(loginUserRejected(error))));
