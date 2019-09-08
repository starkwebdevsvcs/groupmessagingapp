const mongoose = require('mongoose');

//Group Schema
const CustGroupSchema = mongoose.Schema({
    name: {type: String, required: true},
    active: {type: Boolean, required: false}
});

//Export statement
const CustomerGroup = module.exports = mongoose.model('CustomerGroup', CustGroupSchema);