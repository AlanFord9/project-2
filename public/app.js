var express = require("express");
var bodyparser = require("body-parser");
var session = require("express-session");
var passport = require("../config/passport");
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

var app = express();
app.set("view engine", "ejs");

// middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
  session({ secret: "some secrets", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.get("/index", function(req, res) {
  res.render("index");
});

app.post(
  "/index",
  passport.authenticate("local-login", {
    successRedirect: "/userpage",
    failureRedirect: "/index"
  })
);

app.get("/index", function(req, res) {
  res.render("index");
});

app.post(
  "/index",
  passport.authenticate("local-signup", {
    successRedirect: "/userpage",
    failureRedirect: "/index"
  })
);

app.get("/userpage", isAuthenticated, function(req, res) {
  res.render("userpage", { current_user: req.user });
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/index");
});

db.sequelize.sync().then(function() {
  app.listen(3000, function() {
    console.log("we are live....");
  });
});
