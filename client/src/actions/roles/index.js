import { ROLES_ACTIONS } from '../../constants/RolesConstants';

export const swapUsersRole = role => userId => prevRoleState => ({
  type: ROLES_ACTIONS.SWAP_USERS_ROLE,
  payload: {
    role,
    userId,
    newRoleState: !prevRoleState,
  },
});

export const swapUsersRoleFulfilled = payload => ({
  type: ROLES_ACTIONS.SWAP_USERS_ROLE_FULFILLED,
  payload,
});

export const swapUsersRoleRejected = payload => ({
  type: ROLES_ACTIONS.SWAP_USERS_ROLE_REJECTED,
  payload,
});
