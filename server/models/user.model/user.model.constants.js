const userModel = Object.create(null);

userModel.constants = {
  USERS_COLLECTION_NAME: 'users',
  USERS_USERNAME_COLUMN_NAME: 'username',

  SALT_MAX_LENGTH: 40,
  SALT_MIN_LENGTH: 10,

  USER_EMAIL_MAX_LENGTH: 40,
  USER_EMAIL_MIN_LENGTH: 5,

  USER_PASSWORD_MAX_LENGTH: 40,
  USER_PASSWORD_MIN_LENGTH: 6,

  USERNAME_MAX_LENGTH: 30,
  USERNAME_MIN_LENGTH: 3,
};

userModel.errorMessages = {
  USER_ROLES_MUST_BE_ARRAY_OF_STRINGS: "User roles must be passed as a valid array of strings - each of the user's roles.",
};

module.exports = {
  constants: userModel.constants,
  errorMessages: userModel.errorMessages,
};
