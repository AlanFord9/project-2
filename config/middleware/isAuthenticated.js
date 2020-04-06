module.exports = function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  return res.redirect("/login");
};
