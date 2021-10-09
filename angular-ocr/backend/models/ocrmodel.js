const mongoose = require('mongoose');

const ocrmodelSchema = mongoose.Schema({
  folders: [],
  files: [],
  name: { type: String, require: true },
  createdBy: { type: String, require: true },
  createdDate: { type: Date, require: true, default: Date.now },
  editedDate: { type: Date, require: true, default: Date.now },
});

module.exports = mongoose.model('OcrModel', ocrmodelSchema);
