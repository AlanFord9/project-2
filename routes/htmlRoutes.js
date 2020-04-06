var db = require("../models");
var NewsAPI = require("newsapi");
var newsapi = new NewsAPI("d585240049d74c97aabf975b95fe5b55");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // profile route
  app.get("/", isAuthenticated, function(req, res) {
    console.log(req.user);
    db.Posts.findAll({}).then(function(dbExamples) {
      res.render("pages/index", {
        msg: "Welcome!",
        posts: dbExamples,
        current_user: req.user
      });
      console.log("rendering index");
    });
  });

  // display loginand registration
  app.get("/login", function(req, res) {
    res.render("pages/login");
  });

  // city feed
  app.get("/city", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(dbUser) {
      res.render("pages/citypage", {
        // example: dbExample
      });
    });
  });

  // resources map
  app.get("/map", function(req, res) {
    res.render("pages/map", {
      current_user: req.user
    });
  });

  // news page
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
        res.render("pages/news", { news: response.articles });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("pages/404");
  });
};
