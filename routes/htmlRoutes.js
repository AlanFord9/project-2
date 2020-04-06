var db = require("../models");
var NewsAPI = require("newsapi");
var newsapi = new NewsAPI("d585240049d74c97aabf975b95fe5b55");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    console.log(req.user);
    db.Posts.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        posts: dbExamples,
        current_user: req.user
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
  app.get("/map", function(req, res) {
    res.render("map");
  });
  app.get("/news", function(req, res) {
    newsapi.v2
      .everything({
        q: "covid-19",
        sources:
          "buzzfeed, abc-news, associated-press, axios, cbs-news, cnn, fox-news" /*google-news*/,
        domains:
          "buzzfeed.com, abcnews.go.com, axios, apnews.com, cbsnews.com, cnbc.com, cnn.com, foxnews.com", // news.google.com
        from: Date.now(),
        to: Date.now(),
        language: "en",
        sortBy: "relevancy",
        page: 2
      })
      .then(function(response) {
        res.render("news", { news: response.articles });
      });
  });
  app.get("*", function(req, res) {
    res.render("404");
  });
};
