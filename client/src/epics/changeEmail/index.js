import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import { URLS } from '../../constants/UserConstants';
import changeEmailFulfilled from '../../actions/users/changeEmailFulfilled';
import changeEmailRejected from '../../actions/users/changeEmailRejected';

export const changeEmailEpic = action$ =>
  action$.ofType('CHANGE_EMAIL')
    .mergeMap(action =>
      ajax.post(`${URLS.CHANGE_EMAIL}`, action.payload)
        .map(response => changeEmailFulfilled(response))
        .catch(error => Observable.of(changeEmailRejected(error)))
  );

