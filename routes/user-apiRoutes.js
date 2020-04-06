var db = require("../models");

// var flash = require("express-flash");

module.exports = function(app, passport) {
  // Test cases for post it and isAuthenticated middleware

  //_____________________________________________________________
  // This route gets the request
  app.get("/api/users", function(req, res) {
    var username = req.query.username;
    var password = req.body.password;
    // Sequelize to check if there's a valid database entry with these values
    db.Example.findAll({
      where: {
        username: username,
        password: password
      }
    }).then(function(dbUser) {
      // If they're there, redirect, else log the error. Need to put res codes in here.
      if (dbUser != null) {
        res.redirect("/users");
      } else {
        console.log("Error: Verify you have the correct username & password.");
      }
    });
  });
  //_____________________________________________________________
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

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
