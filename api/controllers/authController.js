const passport = require('passport');

function signup(req, res) {
  // process the signup form
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      // If there was an error during authentication
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user) {
      // If authentication failed
      return res.status(401).json({ message: info.message });
    }
    // If authentication was successful, return a success message and the user object
    return res.json({ message: 'Signup successful', user: user });
  })(req, res);
};

function signin(req, res) {
  // process the signin form
  passport.authenticate('local-signin', function(err, user, info) {
    if (err) {
      // If there was an error during authentication
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user) {
      // If authentication failed
      return res.status(401).json({ message: info.message });
    }
    // If authentication was successful, return a success message and the user object
    return res.json({ message: 'Signin successful', user: user });
  })(req, res);
};

function logout(req, res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
}

module.exports = { signup, signin, logout }
