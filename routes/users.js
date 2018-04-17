var express = require('express');
var Product = require('../models/product');
var csrf = require('csurf');
var router = express.Router();
var passport = require('passport');
var csrf_protection = csrf();

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('user/profile');
});

router.get('/logout', isLoggedIn, function(req, res, next) {
  req.logOut();
  res.redirect('/');
});

router.use('/', isNotLoggedIn, function(req,res,next){
  next();
})
/* GET users listing. */
router.get('/signup', function(req, res, next) {
  var error = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), msgs: error, hasError: error.length > 0})
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/signin', function(req, res, next) {
  var error = req.flash('error');
  res.render('user/signin', {csrfToken: req.csrfToken(), msgs: error, hasError: error.length > 0})
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));



module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function isNotLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}