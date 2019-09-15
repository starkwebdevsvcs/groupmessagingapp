const mongoose = require('mongoose');

// Customer Schema
const CustomerSchema = mongoose.Schema({
    phone: {type: String, unique: true},
    name: {type: String, required: false},
    group: {type: String, required: true},
    notes: {type: String, required: false},
    active: {type: Boolean, required: false}
});

//Export statement
const Customer = module.exports = mongoose.model('Customer', CustomerSchema);