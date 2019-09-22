const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Q = require ('q');

require('dotenv').load();
let env = process.env;

// Bring in models
let CustomerGroup = require('../models/models_customergroup');
let StandardMessage = require('../models/models_standardmessage');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Routes
// DOM: Show Group Messages page
router.get('/groupsend', function(req,res){
    StandardMessage.find({}, function(err, standardMessages){
        if(err){
            console.log(err);
        } else {
            CustomerGroup.find({}, function(err, customerGroups){
                if(err){
                    console.log(err);
                } else {
                    res.render('page_messagesgroup', {
                        standardMessages: standardMessages,
                        customerGroups: customerGroups,
                        title: 'Send A Group Message'
                    });
                }
            })
        }
    });
});

// DOM: Show "Preview Page" for Messages
router.get('/grouppreview', function(req,res){
    res.render('page_messagesgrouppreview', {
        title: 'Group Message Preview'
    });
});

// POST: Format Message and show preview page
router.post('/grouppreview', function(req, res) {
    if(req.body.standardMessage === undefined) {
        req.body.standardMessage = '';
    }
    if (req.body.fromName) {
        messagetext = req.body.standardMessage + ' ' + req.body.customMessage + ' Call/text '+ req.body.fromName + ' @ ' + req.body.fromPhone + ' w/ questions';
    } else {
        messagetext = req.body.standardMessage + ' ' + req.body.customMessage + ' Call/text '+ req.body.fromPhone + ' w/ questions';
    }
    messageGroup = req.body.toGroup
    res.redirect('/messages/grouppreview');
});

// DOM: Show Single Messages page
router.get('/singlesend', function(req,res){
    StandardMessage.find({}, function(err, standardMessages){
        if(err){
            console.log(err);
        } else {
            CustomerGroup.find({}, function(err, customerGroups){
                if(err){
                    console.log(err);
                } else {
                    res.render('page_messagessingle', {
                        standardMessages: standardMessages,
                        customerGroups: customerGroups,
                        title: 'Send A Single Message'
                    });
                }
            })
        }
    });
});

// DOM: Show "Preview Page" for Messages
router.get('/singlepreview', function(req,res){
    res.render('page_messagessinglepreview', {
        title: 'Single Message Preview'
    });
});

// POST: Format Message and show preview page
router.post('/singlepreview', function(req, res) {
    if(req.body.standardMessage === undefined) {
        req.body.standardMessage = '';
    }
    let message = {};
    messagetext = req.body.standardMessage + ' ' + req.body.customMessage + ' Call/text '+ req.body.fromName + ' @ ' + req.body.fromPhone + ' w/ questions';
    txtToPhone = req.body.toPhone;

    console.log(message)
    res.redirect('/messages/singlepreview');
});


module.exports = router;

// DOM: Show 'Send Messages' Page
// router.get('/', function(req,res){
//     txtToPhone='';
//     txtFullMsg='';
//     GroupDD.find({}, function(err, groupdds){
//         if(err){
//             console.log(err);
//         } else {
//             res.render('page_messages', {
//                 groupdds:groupdds,
//                 title: 'Send a Message'
//             });
//             }
//     });
// });

// POST: Send a Message through Twilio service
    // router.post('/send', function(req, res) {
    //     twilio.messages
    //         .create({
    //             to: req.body.txtClient1,
    //             from: env.TWILIO_NUM,
    //             body: req.body.txtCustomMsg+' Frm '+req.body.txtCustomFrom+'. '+req.body.txtFromGrp+'. Call '+req.body.txtCallback+' with questions.'
    //         })
    //         .then(message => console.log(message.sid));
    //     console.log('Message Sent!');
    //     res.redirect('/messages');
    // });

    // POST: Send several Messages
    // router.post('/multimsgs', function(req, res) {
    //     // var values = $('.msgToNum').map(function() {return this.value; }).get();
    //     let numbers = ['+1'+req.body.txtClient1,'+1'+req.body.txtClient2,'+1'+req.body.txtClient3,'+1'+req.body.txtClient4, '+1'+req.body.txtClient5]
    //     for (i in numbers) {
    //       twilio.messages
    //         .create(
    //           {
    //             to: numbers[i],
    //             from: 'MG1eadb76e27a933ad7fff82a0a3af7313',
    //             body: 'Multi-message testing'
    //           }
    //       )
    //         .then(message => {
    //           console.log(message);
    //           console.log('Submitted!');
    //         });
    //       }
    //     res.redirect('/messages');
    // });

    // POST: Send several Messages
    //     router.post('/multimsgs', function(req, res) {
    //         let numbers = [req.body.txtClient1,req.body.txtClient2,req.body.txtClient3,req.body.txtClient4,req.body.txtClient5];
    //         Promise.all(
    //             numbers.map(number => {
    //                 return twilio.messages.create({
    //                     to: number,
    //                     from: 'MG1eadb76e27a933ad7fff82a0a3af7313',
    //                     body: 'Multi-message testing'
    //                 });
    //             })
    //         )
    //             .then(messages => {
    //                 console.log(message);
    //                 console.log('Messages sent!');
    //             })
    //             .catch(err => console.error(err));
    //         res.redirect('/messages');
    //     });
