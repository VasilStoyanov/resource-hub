const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const { jwt } = require('./../config');

const params = {
  secretOrKey: jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const applyTo = (app, data) => {
  const strategy = new Strategy(params, (payload, done) => {
    data.users.getById(payload.id)
      .then(user => {
        if (user) {
          console.log(`USER FOUND ${user.id}`);
          return done(null, {
            id: user.id
          });
        }

        return done(new Error('User not found'), null);
      });
  });

  passport.use(strategy);
  passport.initialize();
};

const authenticate = () => passport.authenticate('jwt', jwt.session);

module.exports = {
  applyTo,
  authenticate
};
