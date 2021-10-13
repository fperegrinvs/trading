const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  customData: {
    type: Schema.Types.Mixed, required: true
  },
  createdBy: { type: String, require: true },
  createdDate: { type: Date, require: true, default: Date.now },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
