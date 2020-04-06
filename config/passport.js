var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");
var bcrypt = require("bcrypt");

module.exports = function inilialize(passport, getUserByUsername, getUserByID) {
  var authenticateUser = async function(username, password, done) {
    var user = getUserByUsername(username);
    if (user == null) {
      return done(null, false, {
        message: "No account with that username exisits"
      });
    }

    try {
      if ((await bcrypt.compare(password), user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password is incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  // registration handler
  // BROKEN, PASSPORT IS UNDEFINED. BUT Y DOE
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
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
            return done(null, false, {
              message: "username is already in use."
            });
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
    new LocalStrategy({ usernameField: "username" }, authenticateUser())

    // DUPLICATE CODE IN CASE WE NEED TO REVERT
    // "local-login",
    // new LocalStrategy(
    //   {
    //     usernameField: "username"
    //   },
    //   function(username, password, done) {
    //     db.User.findOne({ where: { username: username } }).then(function(user) {
    //       if (!user) {
    //         return done(null, false, { message: "No Username Found" });
    //       }
    //       if (!user.verifyPassword(password)) {
    //         return done(null, false, { message: "Incorrect password" });
    //       }
    //       return done(null, user);
    //     });
    //   }
    // )
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, getUserByID(id));
  });
};
