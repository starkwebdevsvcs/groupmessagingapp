const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

require('dotenv').load();
let env = process.env;

let Customer = require('../models/models_customer');

// Require the messaging module and create a REST client
const msgservice = require('twilio')(env.TWILIO_SID, env.TWILIO_AUTH);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Routes
    // POST: Send a Message
    router.post('/singlesend', function(req, res) {
        msgservice.messages
            .create({
                to: req.body.previewPhone,
                from: env.TWILIO_NUM,
                body: req.body.previewMessage
            })
            .then(message => console.log(message));
        req.flash('success alert-dismissible fade show', 'Your Reminder/Message was sent!');
        res.redirect('/messages/singlesend');
    });

    // POST: Send a Group Message
    router.post('/groupsend', function(req, res) {
        Customer.find({group:req.body.messageGroup}, function(err, customers){
            if(err){
                console.log(err);
            } else {
                customers.forEach(function(cust) {
                    msgservice.messages
                        .create({
                            to: cust.phone,
                            from: env.TWILIO_NUM,
                            body: req.body.previewMessage
                        })
                        .then(function(response) {
                            console.log(message);  
                        })
                })
            }
        });
        // after collection send is complete, then show success message
        req.flash('success alert-dismissible fade show', 'Your Message was sent to the ' + req.body.messageGroup + ' .');
        res.redirect('/messages/groupsend');
    });

    // DELETE: Removes message from Twilio log
    router.delete('/delete/:id', function (req,res) {
      let msgSID = {_id:req.params.id};
      console.log(msgSID._id);
      client.messages(msgSid._id).delete()
        .then((message) => console.log(message))
      //     if (message.status === 'delivered') {
      //       client.messages(msgSID).delete()
      //         .then(() => console.log("Message deleted"))
      //         .catch((err) => console.error(err));
      //     } else {
      //       setTimeout(() => tryDelete(msgSID), 1000);
      //       res.send('Success');
      //       req.flash('success', 'Reminder message deleted!');
      //     }
      //   })
      //   .catch((err) => console.error(err));
    });

    // POST: Auto response from application for received text messages
    router.post('/sms', function (req, res) {
        const twiml = new MessagingResponse();
        const message = twiml.message();
        message.body('This number does not accept messages or calls. Please use the callback number listed in the text message you received. Thank you!');
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    });


module.exports = router;