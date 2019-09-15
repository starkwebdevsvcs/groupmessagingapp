const express = require('express');
const router = express.Router();

// Bring in models
let Customer = require('../models/models_customer');
let CustomerGroup = require('../models/models_customergroup');

// User Routes

// DOM: Show 'Customer Admin' Page
router.get('/', function(req,res){
    Customer.find({}, function(err, customers){
        if(err){
            console.log(err);
        } else {
          CustomerGroup.find({}, function(err, groups){
            if(err){
              console.log(err);
            } else {
              res.render('page_admincustomers', {
                customers: customers,
                groups: groups,
                title: 'Customer Admin Page'
              });
            }
          })
        }
    })
});


// POST: Save a new Customer to DB
router.post('/add', function(req,res){
  req.checkBody('phone', 'Customer Phone number  is required').notEmpty();
  req.checkBody('group', 'Customer Group  is required').notEmpty();
  // Error check and handling
  let errors = req.validationErrors();
  if(errors){
      // For Flash Messages
      res.render('page_admincustomers',{
          errors: errors,
      });
  } else {
    // If no errors, create new Customer in DB
    let customer = new Customer();
    customer.phone = req.body.phone,
    customer.group = req.body.group,
    customer.name = req.body.name,
    customer.notes = req.body.notes,
    customer.active = true,
    console.log('Customer:', customer)
    customer.save(function(err){
      if(err){
        console.log('Error:', err);
        if (err.code===11000) {
          req.flash('danger alert-dismissible fade show', 'Customer Phone Already Exists!');
          res.redirect('/admin/customers');
        } else {
          req.flash('danger alert-dismissible fade show', 'Unknown Error!');
          res.redirect('/admin/customers');
        }
      } else {
          req.flash('success alert-dismissible fade show', 'New Customer added!');
          res.redirect('/admin/customers');
        }
    });
  }
});


//DOM: Show 'Edit a Customer' Page
router.get('/edit/:id', function(req,res){
  Customer.findById(req.params.id, function(err, customer){
    CustomerGroup.find({}, function(err, groups){
      if(err){
        console.log(err);
      } else {
        res.render('page_admincustomersedit', {
          title: 'Edit a Customer',
          customer: customer,
          groups: groups,
        });
      }
    })
  });
});


//POST: Save Customer changes to the database
router.post('/edit/:id', function(req,res){
  req.checkBody('group', 'Customer Group is required').notEmpty();
  req.checkBody('phone', 'Customer Phone number is required').notEmpty();
  // Error check and handling
  let errors = req.validationErrors();
  if(errors){
      res.render('page_admincustomersedit',{
          errors: errors
      });
  } else {
      let customer  = {};
      customer.phone = req.body.phone;
      customer.group = req.body.group;
      customer.name = req.body.name;
      customer.notes = req.body.notes;
      customer.active = true;
      let query = {_id: req.params.id};
      Customer.updateOne(query, customer, function (err) {
          if(err){
              console.log(err);
              return;
          } else {
              req.flash('success alert-dismissible fade show', 'Customer updated!');
              res.redirect('/admin/customers');
            }
      });
  }
});
  
// DELETE: Removes a Team from the database
router.delete('/delete/:id', function (req,res) {
  let query = {_id:req.params.id}
  Customer.deleteOne(query, function (err) {
    if(err){
      console.log(err);
    } else {
      req.flash('success alert-dismissible fade-in show', 'Customer Deleted!');
      res.send('Success');
    }
  });
});


// Export statement
module.exports=router;
