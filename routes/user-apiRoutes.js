var db = require("../models");

// var flash = require("express-flash");

module.exports = function(app, passport) {
  // this route is where the login information is posted
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/login"
    })
  );
  //_____________________________________________________________
  // The registration route
  app.post(
    "/register",
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/index"
    })
  );
  //_____________________________________________________________
  //  this is used to log out a user
  app.delete("/api/logout", function(req, res) {
    req.logOut();
    res.redirect("/login");
  });
  //_____________________________________________________________
};
