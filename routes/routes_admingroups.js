const express = require('express');
const router = express.Router();

// Bring in models
let CustomerGroup = require('../models/models_customergroup');

 // DOM: Show Customer Group Administration  Page
router.get('/', function(req,res){
  CustomerGroup.find({}, function(err, groups){
    if(err){
      console.log(err);
    } else {
        res.render('page_admincustgroups', {
            groups: groups,
            title: 'Customer Group Administration',
            appVersion: req.app.locals.appVersion,
            copyright: req.app.locals.copyright,
        });
      }
  })
});

// POST: Add a Customer Group to DB
router.post('/add', function(req,res){
  req.checkBody('group', 'Group name  is required').notEmpty();
  // Error check and handling
  let errors = req.validationErrors();
  if(errors){
      // For Flash Messages
      res.render('page_admincustgroups',{
          errors: errors,
      });
  } else {
    // If no errors, create new Group name in DB
    let group = new CustomerGroup();
    group.name = req.body.group,
    group.active = true,
    group.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
          req.flash('success alert-dismissible fade show', 'New Customer Group  added!');
          res.redirect('/admin/groups');
        }
    });
  }
});

// DELETE: Removes Customer Group from database
router.delete('/delete/:id', function (req, res) {
  let query = {_id:req.params.id}
  CustomerGroup.deleteOne(query, function (err) {
    if(err){
      console.log(err);
    } else {
      req.flash('success alert-dismissible fade-in show', 'Customer Group  Deleted!');
      res.send('Success');
    }
  });
});

  //DOM: Show 'Edit a Group' Page
  router.get('/edit/:id', function(req,res){
    CustomerGroup.findById(req.params.id, function(err, group){
      res.render('page_admincustgroupsedit', {
        group: group,
        title: 'Edit a Customer Group'
      });
    });
  });

  //POST: Save Group changes to the database
  router.post('/edit/:id', function(req,res){
  req.checkBody('groupName', 'Group Name is required').notEmpty();
  // Error check and handling
  let errors = req.validationErrors();
  if(errors){
      res.render('page_admincustgroupsedit',{
          errors:errors
      });
  } else {
      let customerGroup = {};
        customerGroup.name = req.body.groupName,
        customerGroup.active = true
      let query = {_id:req.params.id};
      CustomerGroup.update(query, customerGroup, function (err) {
          if(err){
              console.log(err);
              return;
          } else {
              req.flash('success alert-dismissible fade show', 'Customer Group updated!');
              res.redirect('/admin/groups');
            }
      });
  }
});
  
// Export statement
module.exports=router;
