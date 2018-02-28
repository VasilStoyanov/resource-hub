import { Observable } from 'rxjs';
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
    .mergeMap(action =>
      post(`${URLS.LOGIN}`, action.payload)
        .map(ajaxObj => loginUserFulfilled(ajaxObj.response))
        .catch(error => Observable.of(loginUserRejected(error))));

export const registerUserEpic = action$ =>
  action$.ofType('REGISTER')
    .mergeMap(action =>
      post(`${URLS.REGISTER}`, action.payload)
        .map(response => registerUserFulfilled(response))
        .catch(error => Observable.of(registerUserRejected(error))));

export const getUsersEpic = action$ =>
  action$.ofType(USERS_ACTIONS.GET_USERS.DEFAULT)
    .debounceTime(200)
    .switchMap(action =>
      get(`${USERS_URLS.GET_USERS}`, action.payload)
        .map(response => getUsersFulfilled(response))
        .catch(error => Observable.of(getUsersRejected(error))));

export const changeSuggestedUsernameEpic = action$ =>
  action$.ofType(USERS_ACTIONS.CHANGE_USERNAME_SUGCESTION)
    .debounceTime(200)
    .switchMap(action =>
      get(`${USERS_URLS.GET_USERS}`, action.payload)
        .map(response => getUsersFulfilled(response))
        .catch(error => Observable.of(getUsersRejected(error))));
