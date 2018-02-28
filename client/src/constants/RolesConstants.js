export const ROLES_ACTIONS = {
  SWAP_USERS_ROLE: 'SWAP_USERS_ROLE',
  SWAP_USERS_ROLE_FULFILLED: 'SWAP_USERS_ROLE_FULFILLED',
  SWAP_USERS_ROLE_REJECTED: 'SWAP_USERS_ROLE_REJECTED',
};

export const URLS = {
  SWAP_USERS_ROLE: '/userss/{userId}/roles',
};

export const MESSAGES = {
  SUCCESSFULLY_MODIFY_USERS_ROLE:
    ({ action, role, username }) => `Successfully ${action} ${role} role for ${username}`,
};

