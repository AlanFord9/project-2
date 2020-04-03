var db = require("../models");

module.exports = function(app) {
  // Get all Comments
  app.get("/api/comments", function(req, res) {
    db.Comment.findAll({}).then(function(dbComments) {
      res.json(dbComments);
    });
  });

  // Create a new Comment
  app.post("/api/comments", function(req, res) {
    db.Comment.create(req.body).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // Delete an Comment by id
  app.delete("/api/comments/:id", function(req, res) {
    db.Comment.destroy({ where: { id: req.params.id } }).then(function(
      dbComment
    ) {
      res.json(dbComment);
    });
  });
};
