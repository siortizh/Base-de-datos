'use strict';

var express	 	= require('express');
var router 		= express.Router();
//var passport 	= require('passport');

var User = require('../models/user');
//var Product = require('../models/product');

// Home page
//router.get('/', function(req, res, next) {
	// If user is already logged in, then redirect to rooms page
//	if(req.isAuthenticated()){
//		res.redirect('/products');
//	}
//	else{
//		res.render('login', {
//			success: req.flash('success')[0],
//			errors: req.flash('error'), 
//			showRegisterForm: req.flash('showRegisterForm')[0]
//		});
//	}
//});

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
  });



// Login
// URI: /login
//router.post('/login', passport.authenticate('local', { 
//	successRedirect: '/products', 
//	failureRedirect: '/',
//	failureFlash: true
//}));

router.get('/login', function (req, res, next) {
    productoModel
        .login(req.query['email'], req.query['password'])
        .then(id_customer => {
            if (id_customer)
                return res.status(200).send(id_customer);
            else 
                return res.status(200).send("Invalid username or password");
        })
        .catch(err => {
            return res.status(200).send("DB Error - Login");
        });

});



// Register username and password
// URI: /register
router.post('/register', function(req, res, next) {

	var credentials = {'username': req.body.username, 'password': req.body.password };

	if(credentials.username === '' || credentials.password === ''){
		req.flash('error', 'Missing credentials');
		req.flash('showRegisterForm', true);
		res.redirect('/');
	}else{

		// Check if the username already exists for non-social account
		User.findOne({'username': new RegExp('^' + req.body.username + '$', 'i'), 'socialId': null}, function(err, user){
			if(err) throw err;
			if(user){
				req.flash('error', 'Username already exists.');
				req.flash('showRegisterForm', true);
				res.redirect('/');
			}else{
				User.create(credentials, function(err, newUser){
					if(err) throw err;
					req.flash('success', 'Your account has been created. Please log in.');
					res.redirect('/');
				});
			}
		});
	}
});



//Bucar ordenes(historial)
// URI: /qorder/{id_order}
router.get('/qorder/:id_order', function (req, res, next) {
    productoModel
        .qorder(req.params.id_order)
        .then(data_order => {
            if (data_order)
                return res.status(200).send(data_order);
            else 
                return res.status(200).send("id_order doeesn't exist");
        })
        .catch(err => {
            return res.status(200).send("DB Error - qorder");
        });

});



// Cart
// URI: /create_cart
router.post('/create_cart', function (req, res, next) {
    const id_customer  = req.body.id_customer;
    productoModel
        .create_cart(id_customer)
        .then(id_order => {
            if (id_order)
                return res.status(200).send(id_order);
            else 
                return res.status(200).send("problems");
        })
        .catch(err => {
            return res.status(500).send("Error creating cart");
        });
});



// Logout
// URI: /logout
router.get('/logout', function(req, res, next) {
	// remove the req.user property and clear the login session
	req.logout();

	// destroy session data
	req.session = null;

	// redirect to homepage
	res.redirect('/');
});


module.exports = router;