var User = require('../database/index.js').User;
var execute = require('../helpers/sandbox.js').execute;

var passportRoutes = function(app, passport) {
  require('../config/passport.js')(passport);


  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/signupSuccess',
    failureRedirect: '/signupFailure'
  }));
  app.get('/signupSuccess', function(req, res) {
    res.statusCode = 201;
    res.send('successful signup');
  });
  app.get('/signupFailure', function(req, res) {
    res.statusCode = 406;
    res.send('failed signup');
  });


  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  }));
  app.get('/loginSuccess', function(req, res) {
    res.statusCode = 302;
    res.send('successful login');
  });
  app.get('/loginFailure', function(req, res) {
    res.statusCode = 406;
    res.send('failed login');
  });


  app.get('/logout', function(req, res) {
    console.log('Logging out user: ' + req.user);
    req.logout();
    res.end('Logout was a success!');
  });

  app.get('/loggedIn', function(req, res) {
    if (req.user) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
};

var challengeRoutes = function(app) {

  app.post('/challenge', function(req, res) {
    execute(req.body.code, req.body.tests)
      .then((data) => {
        console.log(data);
      });
  });

};

module.exports.passportRoutes = passportRoutes;
module.exports.challengeRoutes = challengeRoutes;
