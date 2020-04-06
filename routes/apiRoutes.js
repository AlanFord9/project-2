var db = require("../models");
var passport = require("../config/passport");
var bcrypt = require("bcrypt");
var flash = require("express-flash");
// https://www.youtube.com/watch?v=-RCnNyD0L-s
// Video tutorial I refferenced in addition to Roger's to make sense of this.

module.exports = function(app) {
  // Test cases for postit and isAuthenticated middleware
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
    passport.authenticate("local", {
      successRedirect: "/userpage",
      failureRedirect: "/login",
      failureFlash: True
    })
  );
  //_____________________________________________________________
  // The registration route
  app.post(
    "/register",
    async function(req, res) {
      console.log(req.body);
      try {
        var hashedPassword = await bcrypt.hash(req.body.password, 10);
        db.User.create({
          username: req.body.username,
          password: hashedPassword,
          city: req.body.city,
          state: req.body.state
        }).then(function(dbUser) {
          res.json(dbUser);
        });
        res.redirect("/login");
      } catch {
        res.redirect("/");
      }
    }
    // passport.authenticate("local-signup", {
    //   successRedirect: "/userpage",
    //   failureRedirect: "/index"
    // })
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
