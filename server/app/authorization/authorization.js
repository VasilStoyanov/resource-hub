const { getStatusCode } = require('./../../utils/status.codes/status.codes');

const unauthorizedStatusCode = getStatusCode('unauthorized');

const allowForRoles = (...roles) => async (req, res, next) => {
  if (!roles || roles.length < 1) {
    next();
    return;
  }

  const { userRoles } = req.user;
  const userHasRequiredRole = roles.some(requiredRole => userRoles.includes(requiredRole));
  if (!userHasRequiredRole) {
    res.sendStatus(unauthorizedStatusCode);
    return;
  }

  next();
};

module.exports = {
  allowForRoles,
};
