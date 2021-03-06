const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//App Routes
    // DOM: Show '/' Page
    router.get('/', function(req,res){
      res.render('page_login', {
        title: 'Login Page',
        appVersion: req.app.locals.appVersion,
        copyright: req.app.locals.copyright,
      });
    });

    // // DOM: Show 'Messages' Page
    // router.get('/messages', function(req,res){
    //     res.render('page_messages', {
    //       title: 'Send a Message'
    //     });
    // });

    // DOM: Show 'Home' Page
    // router.get('/login2', function(req,res){
    //     res.render('page_login2', {
    //       title: 'Disclaimer'
    //     });
    // });

// Export statement
module.exports=router;
