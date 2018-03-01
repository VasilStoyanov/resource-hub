import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import { URLS } from '../../constants/UserConstants';
import changePasswordFulfilled from '../../actions/users/changePasswordFulfilled';
import changePasswordRejected from '../../actions/users/changePasswordRejected';

export const changePasswordEpic = action$ =>
  action$.ofType('CHANGE_PASSWORD')
    .mergeMap(action =>
      ajax.put(
        `${URLS.CHANGE_PASSWORD}`, {
          oldPassword: action.payload.oldPassword,
          newPassword: action.payload.newPassword,
        },
        { Authorization: `Bearer ${action.payload.token}` },
      )
        .map(response => changePasswordFulfilled(response))
        .catch(error => Observable.of(changePasswordRejected(error))));
