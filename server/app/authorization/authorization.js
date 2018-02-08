const { getStatusCode } = require('./../../utils/status.codes/status.codes');

const roleAuthorization = Object.create(null);
const unauthorizedStatusCode = getStatusCode('unauthorized');
const badRequestStatusCode = getStatusCode('badRequest');

const applyTo = (app, data) => {
  roleAuthorization.requireRoles = (...roles) => async (req, res, next) => {
    if (!roles || roles.length < 1) {
      next();
      return;
    }

    if (!req.user || !req.user.id) {
      res.sendStatus(unauthorizedStatusCode);
      return;
    }

    try {
      const user = await data.users.getByUserId(req.user.id);
      if (!user.roles) {
        res.sendStatus(unauthorizedStatusCode);
        return;
      }

      const userHasRequiredRole = roles.some(requiredRole => user.roles.includes(requiredRole));
      if (!userHasRequiredRole) {
        res.sendStatus(unauthorizedStatusCode);
        return;
      }

      next();
    } catch (dbExeption) {
      console.error(dbExeption);
      res.sendStatus(badRequestStatusCode);
    }
  };
};

module.exports = {
  applyTo,
  roleAuthorization,
};
