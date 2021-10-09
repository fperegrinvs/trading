const express = require('express');
const multer = require('multer');

const OcrModel = require('../models/ocrmodel');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/files');
  },
  filename: (req, file, cb) => {
    let words = file.originalname.split('.');
    let filetype = words[words.length - 1];
    words.splice(words.length - 1, 1);
    let filename = words.join();
    const name = filename.toLowerCase().split(' ').join('-');
    cb(null, name + '-' + Date.now() + '.' + filetype);
  },
});

router.post('/uploadfile', multer({ storage: storage }).single('file'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  res.status(201).json({
    message: 'Upload file successfully!',
    filePathURL: url + '/files/' + req.file.filename,
  });
});

router.post('', (req, res, next) => {
  const ocrmodel = new OcrModel({
    folders: req.body.folders,
    files: req.body.files,
    name: req.body.name,
    createdBy: req.body.createdBy,
    createdDate: req.body.createdDate,
    editedDate: req.body.editedDate,
  });

  ocrmodel.save().then((createdData) => {
    res.status(201).json({
      message: 'Create OcrModel Successfully',
      data: createdData,
    });
  });
});

router.get('', (req, res, next) => {
  OcrModel.find().then((documents) => {
    res.status(200).json({
      message: 'Post fetched successfully!',
      data: documents,
    });
  });
});

router.delete('/:id', (req, res, next) => {
  OcrModel.deleteOne({ _id: req.params.id }).then((documents) => {
    res.status(200).json({
      message: 'Post delete successfully!',
    });
  });
});

router.delete('', (req, res, next) => {
  OcrModel.remove().then((documents) => {
    res.status(200).json({
      message: 'Post delete successfully!',
    });
  });
});

module.exports = router;
