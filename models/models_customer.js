const mongoose = require('mongoose');

// Customer Schema
const CustomerSchema = mongoose.Schema({
    name: {type: String, required: true},
    customerGroup: {type: String, required: false},
    active: {type: Boolean, required: false}
});

//Export statement
const Customer = module.exports = mongoose.model('Customer', CustomerSchema);