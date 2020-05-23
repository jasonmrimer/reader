const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('contact', contactSchema);
