var NewsAPI = require("newsapi");
var newsapi = new NewsAPI("d585240049d74c97aabf975b95fe5b55");

// To query /v2/everything
// You must include at least one q, source, or domain
module.exports = function() {
  newsapi.v2
    .everything({
      q: "covid-19",
      sources:
        "buzzfeed, abc-news, associated-press, axios, cbs-news, cnn, fox-news",
      domains:
        "buzzfeed.com, abcnews.go.com, axios, apnews.com, cbsnews.com, cnbc.com, cnn.com, foxnews.com",
      from: Date.now(),
      to: Date.now(),
      language: "en",
      sortBy: "relevancy",
      page: 2
    })
    .then.then(function(response) {
      console.log(Response);
      return Response;
    });
};

// source, title, description, URL

