exports.ensureAuthenticated = (req, res, next) =>
  req.isAuthenticated() ? next() : res.sendStatus(401);
