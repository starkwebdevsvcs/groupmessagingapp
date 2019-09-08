const mongoose = require('mongoose');

// Team Schema
const TeamSchema = mongoose.Schema({
    name: {type: String, required: true},
    active: {type: Boolean, required: false}
});

// Export statement
const Team = module.exports = mongoose.model('Team', TeamSchema);
