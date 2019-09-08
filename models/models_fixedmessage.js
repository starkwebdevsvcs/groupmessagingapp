const mongoose = require('mongoose');

//Fixed Message Schema
const FixedMessageSchema = mongoose.Schema({
    message: {type: String, required: true},
    active: {type: Boolean, required: false}
});

//Export statement
const FixedMessage = module.exports = mongoose.model('FixedMessage', FixedMessageSchema);