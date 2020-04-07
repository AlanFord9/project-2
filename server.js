if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");
const passport = require("./config/passport.js");

//^^^_______________________________________________^^^
// Express-flash is used to flash messages with passport
// var flash = require("express-flash");
// Express-session is used to maintain a session
var session = require("express-session");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Authentication middleware
app.use(
  session({ secret: "some secrets", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// ejs
app.set("view engine", "ejs");

// Routes
require("./routes/user-apiRoutes")(app, passport);
require("./routes/post-apiRoutes")(app);
require("./routes/comment-apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
