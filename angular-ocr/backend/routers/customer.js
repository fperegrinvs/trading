const express = require('express');

const Customer = require('../models/customer');

const router = express.Router();


router.post('', (req, res, next) => {
  const model = new Customer({
    name: req.body.name,
    createdBy: req.body.createdBy,
  });

  model.save().then((createdData) => {
    res.status(201).json({
      message: 'Create Customer Successfully',
      data: createdData,
    });
  });
});

router.get('', (req, res, next) => {
  Customer.find().then((documents) => {
    res.status(200).json({
      message: 'Customers fetched successfully!',
      data: documents,
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Customer.deleteOne({_id: req.params.id}).then((documents) => {
    res.status(200).json({
      message: 'Customer delete successfully!',
    });
  });
});


module.exports = router;
