const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const developerSchema = new Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyDescription: { type: String, required: true },
  userType: { type: String, required: true, default: 'developer' },
});

module.exports = mongoose.model('Developer', developerSchema);