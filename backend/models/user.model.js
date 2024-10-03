const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    birthDate: {type: Date, required: true},
    userType: {type: String, required: true, enum: ['Cliente', 'Developer'], default: 'Cliente'},
});

module.exports = mongoose.model('User', userSchema);