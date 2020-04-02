var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Post.findAll({}).then(function(corona_blog) {
      res.render("index", {
        msg: "Welcome!",
        posts: corona_blog
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render(
        "example",
        {
          example: dbExample
        },
        {
          // Options to allow access to the properties and methods which as causing the error.

          allowProtoMethodsByDefault: true,
          allowProtoPropertiesByDefault: true
        }
      );
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  app.get("/posts", function(req, res) {
    // Handlebars requires an object to be sent to the post handlebars file.
    // Lucky for us, animals[0] is an object!
    // 1. send the dog object from the animals array to the dog handlebars file.
    res.render("post.handlebars", posts);
  });
};
