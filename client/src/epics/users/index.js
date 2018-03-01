import { debounceTime, switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { post } from '../../data';
import { URLS } from '../../constants/UserConstants';
import { URLS as USERS_URLS, USERS_ACTIONS } from '../../constants/UsersConstants';
import { get } from '../../fakeData';

import { loginUserFulfilled,
  loginUserRejected,
  registerUserFulfilled,
  registerUserRejected,
  getUsersFulfilled,
  getUsersRejected } from '../../actions/users/';

export const loginUserEpic = action$ =>
  action$.ofType('LOGIN')
    .pipe(mergeMap(action => post(`${URLS.LOGIN}`, action.payload)
      .pipe(
        map(ajaxObj => loginUserFulfilled(ajaxObj.response)),
        catchError(error => of(loginUserRejected(error))),
      )));

export const registerUserEpic = action$ =>
  action$.ofType('REGISTER')
    .pipe(mergeMap(action => post(`${URLS.REGISTER}`, action.payload)
      .pipe(
        map(response => registerUserFulfilled(response)),
        catchError(error => of(registerUserRejected(error))),
      )));

export const getUsersEpic = action$ =>
  action$
    .ofType(USERS_ACTIONS.GET_USERS.DEFAULT)
    .pipe(
      debounceTime(200),
      switchMap(action =>
        get(`${USERS_URLS.GET_USERS}`, action.payload)
          .pipe(
            map(response => getUsersFulfilled(response)),
            catchError(error => of(getUsersRejected(error))),
          )),
    );

export const changeSuggestedUsernameEpic = action$ =>
  action$.ofType(USERS_ACTIONS.CHANGE_USERNAME_SUGCESTION)
    .pipe(
      debounceTime(200),
      switchMap(action => get(`${USERS_URLS.GET_USERS}`, action.payload)
        .pipe(
          map(response => getUsersFulfilled(response)),
          catchError(error => of(getUsersRejected(error))),
        )),
    );
