const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in models
let User = require('../models/models_user');

// User Routes
    // DOM: User logout process; shows Home page with Login block upon logout
    router.get('/logout', function (req,res) {
        req.logout();
        req.flash('success alert-dismissible fade show', 'You are logged out!');
        res.redirect('/');
    });

    // POST: User Login process
    router.post('/', function (req,res,next){
      passport.authenticate('local', {
        successRedirect: '/messages/groupsend',
        failureRedirect: '/',
        badRequestMessage: 'Please enter valid username and/or valid password.',
        failureFlash: true
      })
      (req,res,next);
    });

// Export statement
module.exports=router;
