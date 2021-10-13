const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const OcrModelRouters = require('./routers/ocrmodel');
const userModelRouters = require('./routers/user');
const customerModelRouters = require('./routers/customer');

const app = express();

mongoose
  .connect(
    'mongodb+srv://soraadmin:%40Ademax123456@ocr.napks.mongodb.net/ocrdemo?authSource=admin&replicaSet=atlas-zzc7m7-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/files', express.static(path.join('backend/files')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use('/api/ocrmodels', OcrModelRouters);
app.use('/api/user', userModelRouters);
app.use('/api/customer', customerModelRouters);

module.exports = app;
