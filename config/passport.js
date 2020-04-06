const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

// registration handler
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    function(req, username, password, done) {
      db.User.findOne({ where: { username: username } }).then(function(
        err,
        user
      ) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, { message: "username is already in use." });
        }
        db.User.create({
          username: username,
          password: password,
          city: req.body.city,
          state: req.body.state
        }).then(function(dbUser) {
          return done(null, dbUser);
        });
      });
    }
  )
);

// login handler
passport.use(
  "local-login",
  new LocalStrategy(function(username, password, done) {
    db.User.findOne({ where: { username: username } }).then(function(user) {
      if (!user) {
        return done(null, false, { message: "username incorrect" });
      }
      if (!user.verifyPassword(password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
