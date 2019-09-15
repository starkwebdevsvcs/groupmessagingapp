const express = require('express');
const router = express.Router();

// Bring in models
let StandardMessage = require('../models/models_standardmessage');

// MESSAGES ROUTES ================================================================>>>

// DOM: Show Message Administration  Page
router.get('/', function(req,res){
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
router.post('/add', function(req,res){
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

  //DOM: Show 'Edit a Message' Page
  router.get('/edit/:id', function(req,res){
    StandardMessage.findById(req.params.id, function(err, standardMessage){
      res.render('page_adminmessagesedit', {
        standardMessage: standardMessage,
        title: 'Edit a Standard Message'
      });
    });
  });

  //POST: Edit a Message in the database
  router.post('/edit/:id', function(req,res){
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

// DELETE: Removes Standard Message from database
router.delete('/delete/:id', function (req, res) {
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

  
// Export statement
module.exports=router;
