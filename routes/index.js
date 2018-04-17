var _ = require('lodash');
var express = require('express');
var Product = require('../models/product');
var csrf = require('csurf');
var router = express.Router();
var passport = require('passport');
var csrf_protection = csrf();
var Cart = require('../models/cart');

router.use(csrf_protection);
/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find(function(err, result){
    res.render('shop/index', { title: 'Shopping Cart', products: _.chunk(result, 3)});
  });
  
});

router.get('/addToCart/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {} );
  console.log(req.session.cart);
  Product.findById(productId , function(err, product){
    if(err){
      return res.redirect('/');
    }
    // if there is a product add to cart
    cart.add(product, productId);
    // update to session
    req.session.cart = cart;
    res.redirect('/');

  });

});

router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart){
    res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice });
});

module.exports = router;
