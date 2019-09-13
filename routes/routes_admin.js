const express = require('express');
const router = express.Router();

// Bring in models
let StandardMessage = require('../models/models_standardmessage');
let CustomerGroup = require('../models/models_customergroup');

// MESSAGES ROUTES ================================================================>>>

// DOM: Show Message Administration  Page
router.get('/messages', function(req,res){
  StandardMessage.find({}, function(err, messages){
    if(err){
      console.log(err);
    } else {
        res.render('page_adminmessages', {
            messages: messages,
            title: 'Standard Message Administration',
            appVersion: req.app.locals.appVersion,
            copyright: req.app.locals.copyright,
        });
      }
  })
});

// POST: Add a Standard Message to DB
router.post('/messages/add', function(req,res){
  req.checkBody('message', 'Message Text  is required').notEmpty();
  // Error check and handling
  let errors = req.validationErrors();
  if(errors){
      // For Flash Messages
      res.render('page_adminmessages',{
          errors: errors,
      });
  } else {
    // If no errors, create new Group name in DB
    let message = new StandardMessage();
    message.text = req.body.message,
    message.active = true,
    message.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
          req.flash('success alert-dismissible fade show', 'New Standard Message added!');
          res.redirect('/admin/messages');
        }
    });
  }
});

// DELETE: Removes Standard Message from database
router.delete('/messages/delete/:id', function (req, res) {
  let query = {_id:req.params.id}
  StandardMessage.deleteOne(query, function (err) {
    if(err){
      console.log(err);
    } else {
      req.flash('success alert-dismissible fade-in show', 'Standard Message Deleted!');
      res.send('Success');
    }
  });
});

  //DOM: Show 'Edit a Message' Page
  router.get('/messages/edit/:id', function(req,res){
    StandardMessage.findById(req.params.id, function(err, standardMessage){
      res.render('page_adminmessagesedit', {
        standardMessage: standardMessage,
        title: 'Edit a Standard Message'
      });
    });
  });

  //POST: Edit a Message in the database
  router.post('/messages/edit/:id', function(req,res){
      req.checkBody('messageText', 'Message text is required').notEmpty();
      // Error check and handling
      let errors = req.validationErrors();
      if(errors){
          res.render('page_adminmessagesedit',{
              errors:errors
          });
      } else {
          let standardMessage = {};
            standardMessage.text = req.body.messageText,
            standardMessage.active = true
          let query = {_id:req.params.id};
          StandardMessage.update(query, standardMessage, function (err) {
              if(err){
                  console.log(err);
                  return;
              } else {
                  req.flash('success alert-dismissible fade show', 'Standard message updated!');
                  res.redirect('/admin/messages');
                }
          });
      }
  });

 // GROUPS ROUTES ================================================================>>>

 // DOM: Show Customer Group Administration  Page
router.get('/groups', function(req,res){
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
router.post('/groups/add', function(req,res){
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
router.delete('/groups/delete/:id', function (req, res) {
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
  router.get('/groups/edit/:id', function(req,res){
    CustomerGroup.findById(req.params.id, function(err, group){
      res.render('page_admincustgroupsedit', {
        group: group,
        title: 'Edit a Customer Group'
      });
    });
  });

  //POST: Edit a Message in the database
  router.post('/groups/edit/:id', function(req,res){
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
