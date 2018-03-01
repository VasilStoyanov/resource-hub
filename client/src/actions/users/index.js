import { USERS_ACTIONS } from '../../constants/UsersConstants';

export const registerUser = userData => ({
  type: 'REGISTER',
  payload: userData,
});

export const registerUserFulfilled = payload => ({
  type: 'REGISTER_FULFILLED',
  payload,
});

export const registerUserRejected = payload => ({
  type: 'REGISTER_REJECTED',
  payload,
});

export const loginUser = userCredentials => ({
  type: 'LOGIN',
  payload: userCredentials,
});

export const loginUserRejected = payload => ({
  type: 'LOGIN_REJECTED',
  payload,
});

export const loginUserFulfilled = payload => ({
  type: 'LOGIN_FULFILLED',
  payload,
});

export const getUsers = payload => ({
  type: USERS_ACTIONS.GET_USERS.DEFAULT,
  payload,
});

export const getUsersFulfilled = payload => ({
  type: USERS_ACTIONS.GET_USERS.FULFILLED,
  payload,
});

export const getUsersRejected = payload => ({
  type: USERS_ACTIONS.GET_USERS.REJECTED,
  payload,
});

export const changeSuggestedUsername = payload => ({
  type: USERS_ACTIONS.CHANGE_USERNAME_SUGCESTION,
  payload,
});
