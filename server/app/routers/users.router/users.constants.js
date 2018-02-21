const USERS_CONSTANTS = Object.create(null);

USERS_CONSTANTS.INCORRECT_PASSWORD = 'Incorrect password';

USERS_CONSTANTS.USERNAME_NOT_FOUND = username => `Username ${username} does not exist`;
USERS_CONSTANTS.PROPERTY_ALREADY_IN_USE = ({ property, value }) => (
  `${property} '${value}' is already in use`
);


module.exports = USERS_CONSTANTS;
