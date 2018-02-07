import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import { URLS } from '../../constants/UserConstants';
import changePasswordFulfilled from '../../actions/users/changePasswordFulfilled';
import changePasswordRejected from '../../actions/users/changePasswordRejected';

export const changePasswordEpic = action$ =>
  action$.ofType('CHANGE_PASSWORD')
    .mergeMap(action =>
      ajax.post(`${URLS.CHANGE_PASSWORD}`, action.payload)
        .map(response => changePasswordFulfilled(response))
        .catch(error => Observable.of(changePasswordRejected(error)))
  );

