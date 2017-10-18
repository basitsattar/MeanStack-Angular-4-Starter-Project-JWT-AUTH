var express = require('express');
var router = express.Router();
var User = require("../models/user");
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('../config/env');
require('../controllers/auth')(passport);
var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}


/* GET login page. */

router.post('/signup', function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'Please pass username and password.' });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: 'Username already exists.' });
      }
      res.json({ success: true, msg: 'Successful created new user.' });
    });
  }
});

router.post('/signin', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var payload = {id: user._id,username: user.username};          
          var token = jwt.sign(payload, config.secret);
          // return the information including token as JSON
          res.json({ success: true, token: token });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
});
router.get("/secure_data", passport.authenticate('jwt', { session: false }), function(req, res){
    res.json("This is secure data fetched from server after validating jwt");
});

/* Handle Logout */
router.get('/signout', function (req, res) {
  req.logout();
  res.redirect('/');
});



module.exports = router;