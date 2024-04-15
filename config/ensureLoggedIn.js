// Middleware for routes that require a logged in user
module.exports = function(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }
  