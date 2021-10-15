const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ocrModelSchema = new Schema({
  folders: [],
  files: [],
  customerID: {type: Schema.Types.ObjectId, require: true},
  createdBy: {type: String, require: true},
  createdDate: {type: Date, require: true, default: Date.now},
  editedDate: {type: Date, require: true, default: Date.now},
});

module.exports = mongoose.model('OcrModel', ocrModelSchema);

