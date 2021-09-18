const User = require("../models/user.model");
const { success, error } = require("../utils/responseApi");
const passport = require("passport");

exports.login = async (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send(error("No user exits", 400));
      else {
        req.login(user, function (error) {
          if (error) return next(error);
          return res.send(success("Come here for login", user, 200));
        });
      }
    })(req, res, next);
  } catch (err) {
    res.send(error(err.message, 400));
  }
};
