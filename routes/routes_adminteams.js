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


//DOM: Show 'Edit a Team' Page
router.get('/edit/:id', function(req,res){
  Team.findById(req.params.id, function(err, team){
    res.render('page_adminteamsedit', {
        team: team,
        title: 'Edit a Team'
    });
  });
});


//POST: Save Team changes to the database
router.post('/edit/:id', function(req,res){
  req.checkBody('teamName', 'Team Name is required').notEmpty();
  // Error check and handling
  let errors = req.validationErrors();
  if(errors){
      res.render('page_adminteamsedit',{
          errors:errors
      });
  } else {
      let team  = {};
        team.name = req.body.teamName,
        team.active = true
      let query = {_id:req.params.id};
      Team.update(query, team, function (err) {
          if(err){
              console.log(err);
              return;
          } else {
              req.flash('success alert-dismissible fade show', 'Team updated!');
              res.redirect('/admin/teams');
            }
      });
  }
});
  
// DELETE: Removes a Team from the database
router.delete('/delete/:id', function (req,res) {
  let query = {_id:req.params.id}
  Team.deleteOne(query, function (err) {
    if(err){
      console.log(err);
    } else {
      req.flash('success alert-dismissible fade-in show', 'Team  Deleted!');
      res.send('Success');
    }
  });
});


// Export statement
module.exports=router;
