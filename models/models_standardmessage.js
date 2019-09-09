const mongoose = require('mongoose');

//Fixed Message Schema
const StandardMessageSchema = mongoose.Schema({
    text: {type: String, required: true},
    active: {type: Boolean, required: false}
});

//Export statement
const StandardMessage = module.exports = mongoose.model('StandardMessage', StandardMessageSchema);