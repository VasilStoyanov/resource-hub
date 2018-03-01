import { Observable } from 'rxjs';
import { URLS, ROLES_ACTIONS } from '../../constants/RolesConstants';
import { put, del } from '../../fakeData';
import { swapUsersRoleFulfilled,
  swapUsersRoleRejected } from '../../actions/roles';

export const addUsersRoleEpic = action$ =>
  action$.ofType(ROLES_ACTIONS.SWAP_USERS_ROLE)
    .debounceTime(200)
    .filter(action => action.payload.newRoleState)
    .mergeMap(action => put(`${URLS.SWAP_USERS_ROLE}`, action.payload)
      .map(() => action.payload)
      .map(payload => swapUsersRoleFulfilled(payload))
      .catch(error => Observable.of(swapUsersRoleRejected(error))));

export const removeUsersRoleEpic = action$ =>
  action$.ofType(ROLES_ACTIONS.SWAP_USERS_ROLE)
    .debounceTime(200)
    .filter(action => !action.payload.newRoleState)
    .mergeMap(action => del(`${URLS.SWAP_USERS_ROLE}`, action.payload)
      .map(() => action.payload)
      .map(payload => swapUsersRoleFulfilled(payload))
      .catch(error => Observable.of(swapUsersRoleRejected(error))));
