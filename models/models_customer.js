const mongoose = require('mongoose');

// Customer Schema
const CustomerSchema = mongoose.Schema({
    phone: {type: String, unique: true},
    group: {type: String, required: true},
    name: {type: String, required: false},
    notes: {type: String, required: false},
    active: {type: Boolean, required: false, default: true}
});

//Export statement
const Customer = module.exports = mongoose.model('Customer', CustomerSchema);