const express = require('express');
const router = express.Router();

// Bring in models
let Team = require('../models/models_team');

// User Routes

// DOM: Show 'Add a Team' Page
router.get('/', function(req,res){
    Team.find({}, function(err, teams){
        if(err){
            console.log(err);
        } else {
            res.render('page_adminteams', {
                teams: teams,
                title: 'Team Admin Page'
            });
          }
    })
});


// POST: Add a Team to DB
router.post('/add', function(req,res){
  req.checkBody('team', 'Team name  is required').notEmpty();
  // Error check and handling
  let errors = req.validationErrors();
  if(errors){
      // For Flash Messages
      res.render('page_adminteams',{
          errors: errors,
      });
  } else {
    // If no errors, create new Group name in DB
    let team = new Team();
    team.name = req.body.team,
    team.active = true,
    team.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
          req.flash('success alert-dismissible fade show', 'New Team  added!');
          res.redirect('/admin/teams');
        }
    });
  }
});


    //DOM: Show 'Edit a User' Page
    router.get('/edit/:id', function(req,res){
      User.findById(req.params.id, function(err, userFrmDB){
        res.render('page_adminusersedit', {
            userInForm:userFrmDB,
            title: 'Edit a User'
        });
      });
    });

    //POST: Edit a User in the database
    router.post('/edit/:id', function(req,res){
      req.checkBody('username', 'User name is required').notEmpty();
      req.checkBody('role', 'User role is required').notEmpty();
      req.checkBody('password', 'A password is required').notEmpty();
      req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
      // Error check and handling
      let errors = req.validationErrors();
      if(errors){
          res.render('page_adminusersedit',{
            errors:errors
          });
      } else {
        let user = {};
          user.username = req.body.username,
          user.password = req.body.password,
          user.role = req.body.role,
          user.openpwd = req.body.password,
          user.active = true,
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
              console.log(err);
              return;
            } else {
              user.password = hash;
              let query = {_id:req.params.id};
              User.update(query, user, function (err) {
                if(err){
                  console.log(err);
                  return;
                } else {
                    req.flash('success alert-dismissible fade show', 'User '+user.username+' Updated!');
                    res.redirect('/admin/users');
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


// Export statement
module.exports=router;
