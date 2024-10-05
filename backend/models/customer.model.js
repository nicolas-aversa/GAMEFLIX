const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    birthDate: {type: Date, required: true},
    userType: {type: String, required: true, default: 'customer'},
});

module.exports = mongoose.model('Customer', customerSchema);