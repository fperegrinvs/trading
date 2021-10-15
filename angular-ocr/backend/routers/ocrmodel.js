const express = require("express");
const multer = require("multer");

const OcrModel = require("../models/ocrmodel");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
  const ocrModel = new OcrModel({
    folders: req.body.folders,
    files: req.body.files,
    customerID: req.userData.user.customData.customerID,
    createdBy: req.userData.user.username,
    createdDate: req.body.createdDate,
    editedDate: req.body.editedDate,
  });

  ocrModel.save().then((createdData) => {
    res.status(201).json({
      message: "Create OcrModel Successfully",
      data: createdData,
    });
  });
});

router.post("/createOcrModelRoot", checkAuth, (req, res, next) => {
  const ocrModel = new OcrModel({
    folders: req.body.folders,
    files: req.body.files,
    customerID: req.userData.user.customData.customerID,
    createdBy: req.userData.user.username,
    createdDate: req.body.createdDate,
    editedDate: req.body.editedDate,
  });
  ocrModel.save().then((createdData) => {
    res.status(201).json({
      message: "Create OcrModel Successfully",
      data: createdData,
    });
  });
});

router.get("", checkAuth, (req, res, next) => {
  OcrModel.find({ customerID: req.userData.user.customData.customerID }).then(
    (documents) => {
      res.status(200).json({
        message: "Post fetched successfully!",
        data: documents,
      });
    }
  );
});

router.delete("/:id", checkAuth, (req, res, next) => {
  OcrModel.deleteOne({
    _id: req.params.id,
    customerID: req.userData.user.customData.customerID,
  }).then((documents) => {
    res.status(200).json({
      message: "Post delete successfully!",
    });
  });
});

router.delete("", checkAuth, (req, res, next) => {
  OcrModel.remove({ customerID: req.userData.user.customData.customerID }).then(
    (documents) => {
      res.status(200).json({
        message: "Post delete successfully!",
      });
    }
  );
});

module.exports = router;
