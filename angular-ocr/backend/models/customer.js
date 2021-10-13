const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: { type: String, require: true },
  createdBy: { type: String, require: true },
  createdDate: { type: Date, require: true, default: Date.now },
});

customerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Customer', customerSchema);
