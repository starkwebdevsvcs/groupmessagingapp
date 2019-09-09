const express = require('express');
const router = express.Router();

// Bring in models
let StandardMessage = require('../models/models_standardmessage');

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

// POST: Add a Group Dropdown to DB
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
    
// Export statement
module.exports=router;
