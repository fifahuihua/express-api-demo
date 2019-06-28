const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');
const CommonUtil = require('../utils/common.utils');

module.exports = function(app) {
  // Serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize sessions
  passport.deserializeUser(function(id, done) {
    User.findOne(
      {
        _id: id
      },
      '-salt -password',
      function(err, user) {
        done(err, CommonUtil.convertUserInfo(user));
      }
    );
  });

  // Use local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },
      function(username, password, done) {
        User.findOne(
          {
            username: username.toLowerCase()
          },
          function(err, user) {
            if (err) {
              return done(err);
            }
            if (!user || !user.authenticate(password)) {
              return done(null, false, {
                message: 'Invalid username or password'
              });
            }

            return done(null, CommonUtil.convertUserInfo(user));
          }
        );
      }
    )
  );

  // Add passport's middleware
  app.use(passport.initialize());
  app.use(passport.session());
};
