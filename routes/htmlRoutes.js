var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Posts.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        posts: dbExamples
      });
      console.log("rendering index");
    });
  });
  // Load example page and pass in an example by id
  app.get("/user/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(dbUser) {
      res.render("example", {
        // example: dbExample
      });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
