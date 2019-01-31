function loggedOut(req, res, next) {
  // when both are true, it means that the user is logged in
  if (req.session && req.session.userId) {
    res.redirect('/profile');
  }
  return next();
}

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error("You are not authorized to view this page");
    err.status = 401;
    return next(err);
  }
}

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;