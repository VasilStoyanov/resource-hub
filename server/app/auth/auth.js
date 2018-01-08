const passport = require('passport');
const { Strategy } = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const USERNAME_NOT_FOUND = (username) => `${username} not found`;
const INCORRECT_PASSWORD = 'Incorrect password';

const applyTo = (app, data) => {
  passport.use(new Strategy((username, password, done) => {
    data.users.getOneByUsername(username)
      .then(user => (
        user ? data.users.checkPassword({ username, password }) :
        done(null, false, { message: USERNAME_NOT_FOUND(username) })
      ))
      .then(dbResponse => (
        dbResponse.validPassword ? done(null, dbResponse.user) :
        done(null, false, { message: INCORRECT_PASSWORD })));
  }));

  app.use(cookieParser());
  app.use(session({ secret: 'jsgurus', resave: false, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    console.log('hakuna deserializana');
    data.users.getById(id)
      .then((user) => {
        done(null, user);
      })
      .catch(done);
  });
};

module.exports = { applyTo };
