import { combineEpics } from 'redux-observable';
import { loginUserEpic, registerUserEpic, getUsersEpic, changeSuggestedUsernameEpic } from './users/';
import { getTopicsEpic, getTopicRequestsEpic, approveTopicRequest } from './topics';
import { changeEmailEpic } from './changeEmail';
import { changePasswordEpic } from './changePassword';
import { searchResourceEpic, getResourcesNames, searchInputChange } from './resources';
import { addUsersRoleEpic, removeUsersRoleEpic } from './roles';

export const rootEpic = combineEpics(
  loginUserEpic,
  registerUserEpic,
  getTopicsEpic,
  searchResourceEpic,
  getResourcesNames,
  searchInputChange,
  changeEmailEpic,
  changePasswordEpic,
  getUsersEpic,
  addUsersRoleEpic,
  removeUsersRoleEpic,
  changeSuggestedUsernameEpic,
  getTopicRequestsEpic,
  approveTopicRequest,
);

export default rootEpic;

