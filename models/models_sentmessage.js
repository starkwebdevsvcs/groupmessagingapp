const mongoose = require('mongoose');

// Sent Message Schema
const SentMessageSchema = mongoose.Schema({
    txtPhone: {type: String, required: true},
    txtBody: {type: String, required: true},
    userName: {type: String, required: true},
    sentDate: {type: Date, required: true},
    twilioSID: {type: String, required: false},
    twilioStatus: {type: String, required: false}
});

//Export statement
const SentMessage = module.exports = mongoose.model('SentMessage', SentMessageSchema);
