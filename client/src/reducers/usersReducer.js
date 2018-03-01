import { toast } from 'react-toastify';
import { USERS_ACTIONS, ROWS_PER_PAGE } from '../constants/UsersConstants';
import { ROLES_ACTIONS, MESSAGES } from '../constants/RolesConstants';

const initialState = {
  users: [],
  totalCount: 20,
  suggestedUsername: '',
  currentPage: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USERS_ACTIONS.GET_USERS.FULFILLED: {
      return {
        users: [...payload.users],
        totalCount: payload.totalCount,
        suggestedUsername: state.suggestedUsername,
        currentPage: (payload.to / ROWS_PER_PAGE) - 1,
      };
    }
    case USERS_ACTIONS.GET_USERS.REJECTED: {
      return { ...state };
    }
    case ROLES_ACTIONS.SWAP_USERS_ROLE_FULFILLED: {
      const processedUsers = state.users.map((user) => {
        if (user.userId === payload.userId) {
          const newUser = { ...user };

          if (payload.newRoleState) {
            toast.success(MESSAGES.SUCCESSFULLY_MODIFY_USERS_ROLE({
              action: 'added',
              role: payload.role,
              username: user.username,
            }));

            newUser.roles.push(payload.role);
            return newUser;
          }

          toast.success(MESSAGES.SUCCESSFULLY_MODIFY_USERS_ROLE({
            action:
            'deleted',
            role: payload.role,
            username: user.username,
          }));

          const index = newUser.roles.indexOf(payload.role);
          newUser.roles.splice(index, 1);
          return newUser;
        }

        return user;
      });

      return {
        users: processedUsers,
        totalCount: state.totalCount,
        suggestedUsername: state.suggestedUsername,
        currentPage: state.currentPage,
      };
    }
    case ROLES_ACTIONS.SWAP_USERS_ROLE_REJECTED: {
      toast.error(payload);

      return { ...state };
    }
    case USERS_ACTIONS.CHANGE_USERNAME_SUGCESTION: {
      const newState = { ...state };
      newState.suggestedUsername = payload.suggestedUsername;

      return newState;
    }
    default: {
      return { ...state };
    }
  }
};
