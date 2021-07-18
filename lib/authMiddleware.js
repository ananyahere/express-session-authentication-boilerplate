// Method-1 =>check user is logged in
module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res
      .status(401)
      .json({ msg: "You are not authorized to view this resource" });
  }
};

// Method-2 => check user is logged in & is admin
module.exports.isAdmin = (req, res, next) => {
  // TO-DO
};
