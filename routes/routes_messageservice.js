const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

require('dotenv').load();
let env = process.env;

let Customer = require('../models/models_customer');

// Require the messaging module and create a REST client
const singlemsgservice = require('twilio')(env.TWILIO_SID, env.TWILIO_AUTH);
const groupmsgservice = require('twilio')(env.TWILIO_SID, env.TWILIO_AUTH).notify.services(env.TWILIO_NOTIFY_SERVICE_SID);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Routes
    // POST: Send a Message
    router.post('/singlesend', function(req, res) {
        singlemsgservice.messages
            .create({
                to: req.body.previewPhone,
                from: env.TWILIO_NUM,
                body: req.body.previewMessage
            })
            .then(response => console.log(response));
        req.flash('success alert-dismissible fade show', 'Your Message was sent to ' + req.body.previewPhone + '!');
        res.redirect('/messages/singlesend');
    });

    // POST: Send a Group Message
    router.post('/groupsend', function(req, res) {
        Customer.find({group:req.body.messageGroup}, function(err, customers){
            if(err){
                console.log(err);
            } else {
                let bindings = customers.map(function(cust) {
                    // let splitPhone = cust.phone.split("");
                    // splitPhone.splice(2,4,'X','X','X','X')
                    // console.log(splitPhone)
                    // let ident = splitPhone.join("");
                    // console.log(ident)
                    return JSON.stringify({
                        identity: '+1' + cust.identity,
                        binding_type: 'sms',
                        address: '+1'+ cust.phone,
                    })
                })
                console.log(bindings)

                const notificationOpts = {
                    toBinding: bindings,
                    body: req.body.previewMessage,
                };

                groupmsgservice.notifications
                .create(notificationOpts)
                .then(notification => {
                    console.log(notification.sid);
                    req.flash('success alert-dismissible fade show', 'Your Message was sent to the members of the ' + req.body.messageGroup + '  Group.');
                    res.redirect('/messages/groupsend');            
                })
                .catch(error => {
                    console.log('Group Send Error:', error);
                    req.flash('success alert-dismissible fade show', 'Your Message to the ' + req.body.messageGroup + '  Group could not be sent.');
                    throw error;
                });
            }
        });
    });

    // DELETE: Removes message from Twilio log
    router.delete('/delete/:id', function (req,res) {
      let msgSID = {_id:req.params.id};
      console.log(msgSID._id);
      client.messages(msgSid._id).delete()
        .then((response) => console.log(response));
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