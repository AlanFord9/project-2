var db = require("../models");

module.exports = function(app) {
  // Get all Posts
  app.get("/posts", function(req, res) {
    db.Posts.findAll({ order: '"updatedAt" DESC'}).then(function(dbPosts) {
      res.render("pages/citypage", { posts: dbPosts });
    });
  });

  // Create a new Post
  app.post("/posts", function(req, res) {
    db.Posts.create(req.body).then(function(dbPosts) {
      res.redirect("/city")
    });
  });

  // Delete an Post by id
  app.delete("posts/:id", function(req, res) {
    db.Posts.destroy({ where: { id: req.params.id } }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
