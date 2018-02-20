const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const { jwt } = require('./../config');

const params = {
  secretOrKey: jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const applyTo = (app, data) => {
  const strategy = new Strategy(params, (payload, done) => {
    data.users.getByUserId(payload.id)
      .then(user => (user ? done(null, {
        id: user.userId,
        userRoles: user.roles ? user.roles : [],
      }) : done()));
  });

  passport.use(strategy);
  passport.initialize();
};

const requireAuthentication = () => passport.authenticate('jwt', jwt.session);

module.exports = {
  applyTo,
  requireAuthentication,
};
