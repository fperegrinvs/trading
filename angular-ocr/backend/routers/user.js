const express = require('express');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require('../models/user');
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const SECRET = '@AdemaxDemoByWindSora';

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const model = new User({
      username: req.body.username,
      password: hash,
      customData: req.body.customData,
      createdBy: req.body.createdBy,
    });
    model.save().then((createdData) => {
      res.status(201).json({
        message: 'Create user successfully',
        data: createdData,
      });
    }).catch(err => {
      res.status(500).json({
        error: err
      })
    });
  });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({username: req.body.username}).then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jwt.sign(
      {
        username: fetchedUser.username,
        userId: fetchedUser._id,
        customData: fetchedUser.customData,
        createdBy: fetchedUser.createdBy,

      },
      SECRET,
      {expiresIn: "24h"}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600 * 24,
      userId: fetchedUser._id,
      username: fetchedUser.username
    });
  }).catch(err => {
    return res.status(401).json({
      message: "Auth failed"
    });
  });
});

router.get('', (req, res, next) => {
  User.find().then((documents) => {
    res.status(200).json({
      message: 'Users fetched successfully!',
      data: documents,
    });
  });
});

router.get('/me', checkAuth, (req, res, next) => {
  res.status(200).json({
    message: 'successfully',
    data: req.userData,
  });
});

router.delete('/:id', (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then((documents) => {
    res.status(200).json({
      message: 'User delete successfully!',
    });
  });
});


module.exports = router;
