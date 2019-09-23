const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const dialog = require('dialog');

// Bring in models
let User = require('../models/models_user');
let Team = require('../models/models_team');

// User Routes

// DOM: Show 'Add a User' Page
router.get('/', function(req,res){
    User.find({}, function(err, appUsers){
        if(err){
            console.log(err);
        } else {
          Team.find({}, function(err, teams) {
            if(err) {
                console.log(err);
            } else {
                res.render('page_adminusers', {
                    title: 'User Admin Page',
                    appUsers: appUsers,
                    teams: teams,
                });
            }
          })
        }
    })
})


// POST: Save new User to DB
router.post('/add', function(req,res){
  req.checkBody('name', 'User name is required').notEmpty();
  req.checkBody('team', 'User team is required').notEmpty();
  req.checkBody('password', 'A password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  // Error check and handling
  let errors = req.validationErrors();
  if(errors){
    // For Flash Messages
      res.render('page_adminusers',{
          errors:errors
      });
  } else {
    // If no errors, create new user in DB
    let appUser = new User();
      appUser.username = req.body.name,
      appUser.password = req.body.password,
      appUser.team = req.body.team,
      // appUser.openpwd = req.body.password,
      appUser.active = true,
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(appUser.password, salt, function (err, hash) {
            if (err) {
                console.log(err);
            }
            appUser.password = hash;
            appUser.save(function(err){
              if(err){
                console.log(err);
                return;
              } else {
                  req.flash('success alert-dismissible fade show', 'User ' + appUser.name + ' added!');
                  res.redirect('/admin/users');
                }
            });
        });
    })
  }
});


//DOM: Show 'Edit a User' Page
router.get('/edit/:id', function(req,res){
  User.findById(req.params.id, function(err, appUser){
    Team.find({}, function(err, teams) {
      if(err) {
          console.log(err);
      } else {
        res.render('page_adminusersedit', {
          userInForm: appUser,
          teams: teams,
          title: 'Edit a User'
        });
      }
    })
  });
});

  //POST: Save user changes in the database
  router.post('/edit/:id', function(req,res){
    req.checkBody('username', 'User name is required').notEmpty();
    req.checkBody('role', 'User role is required').notEmpty();
    req.checkBody('password', 'A password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    // Error check and handling
    let errors = req.validationErrors();
    if(errors){
        res.render('page_adminusersedit',{
          errors: errors
        });
    } else {
      let appUser = {};
        appUser.username = req.body.username,
        appUser.password = req.body.password,
        appUser.team = req.body.team,
        // appUser.openpwd = req.body.password,
        appUser.active = true,
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(appUser.password, salt, function (err, hash) {
          if (err) {
            console.log(err);
            return;
          } else {
            appUser.password = hash;
            let query = {_id:req.params.id};
            appUser.update(query, appUser, function (err) {
              if(err){
                console.log(err);
                return;
              } else {
                  req.flash('success alert-dismissible fade show', 'User '+appUser.username+' Updated!');
                  res.redirect('/');
                }
            });
          }
        });
      })
    }
});

// DELETE: Removes user from database
router.delete('/delete/:id', function (req,res) {
  let query = {_id:req.params.id}
  User.remove(query, function (err) {
    if(err){
      console.log(err);
    } else {
      res.send('Success');
      req.flash('success', 'User deleted!');
    }
  });
});

module.exports=router;
