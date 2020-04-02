const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("d585240049d74c97aabf975b95fe5b55");

// To query /v2/everything
// You must include at least one q, source, or domain
newsapi.v2
  .everything({
    q: "corona virus",
    sources:
      "buzzfeed, abc-news, associated-press, axios, bloomberg, cbs-news, cnn, fox-news, google-news",
    domains:
      "buzzfeed.com, abcnews.go.com, axios, apnews.com, bloomberg.com, cbsnews.com, cnbc.com, cnn.com, foxnews.com, news.google.com",
    from: "2020-03-01",
    to: "2020-03-31",
    language: "en",
    sortBy: "relevancy",
    page: 2
  })
  .then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
  });
