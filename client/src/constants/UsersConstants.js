export const USERS_ACTIONS = {
  GET_USERS: {
    DEFAULT: 'GET_USERS',
    FULFILLED: 'GET_USERS_FULFILLED',
    REJECTED: 'GET_USERS_REJECTED',
  },
  CHANGE_USERNAME_SUGCESTION: 'CHANGE_USERNAME_SUGCESTION',
};

export const URLS = {
  GET_USERS: '/users',
};


export const MESSAGES = {
  UNAUTHORIZED_FOR_EDIT_USER_ROLE: userGroup => `Unauthorized for add or remove user role "${userGroup}" !`,
};
export const ROWS_PER_PAGE = 10;// todo
