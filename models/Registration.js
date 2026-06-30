const mongoose = require('mongoose');

// Create the Mongoose Schema
const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
    },
});

module.exports = mongoose.model('Registration', registrationSchema);