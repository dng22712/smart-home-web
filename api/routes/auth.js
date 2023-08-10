const authController = require('../controllers/authController');

module.exports = function (app, passport) {
  app.get('/signup', authController.signup);
  app.get('/signin', authController.signin);
  app.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (!user) {
        return res.status(400).json({ message: info.message });
      }
      return res.status(200).json({ message: 'Registration successful' });
    })(req, res, next);
  });
  app.get('/logout', authController.logout);
  app.post('/signin', function (req, res, next) {
    passport.authenticate('local-signin', function (err, user, info) {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.logIn(user, function (err) {
        if (err) {
          return res.status(500).json({ message: 'Internal server error' });
        }
        return res.status(200).json({ message: 'Authentication successful' });
      });
    })(req, res, next);
  });
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/signin');
  }
};