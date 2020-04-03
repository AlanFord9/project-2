var db = require("../models");

module.exports = function(app) {
  // Get all Posts
  app.get("/posts", function(req, res) {
    db.Posts.findAll({}).then(function(dbPosts) {
      res.render("citypage", { posts: dbPosts });
    });
  });

  // Create a new Post
  app.post("/api/posts", function(req, res) {
    db.Posts.create(req.body).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });

  // Delete an Post by id
  app.delete("/api/posts/:id", function(req, res) {
    db.Posts.destroy({ where: { id: req.params.id } }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
