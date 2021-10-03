const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose
  .connect(
    'mongodb+srv://soraadmin:%40Ademax123456@ocr.napks.mongodb.net/test?authSource=admin&replicaSet=atlas-zzc7m7-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  Cors({
    origin: true,
    Credential: true,
    methods: 'GET, POST, PATCH, DELETE, OPTIONS',
  })
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});
app.post('/api/ocrmodels', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Successfully',
  });
});

app.get('/api/ocrmodels', (req, res, next) => {
  const data = [
    {
      id: 'asdasdasdasd',
      name: 'test1',
      state: '',
      createdBy: '',
      createdDate: '2021-10-02T07:03:06.166Z',
      files: [{ progressOcr: { pending: false }, filesNormal: 'assets/files/test.pdf', progressExtract: { pending: false } }],
      loaivanban: '',
      coquanbanhanh: '',
      sovanban: '',
      nguoiky: '',
    },
    {
      id: 'vcxvxcvcxv',
      name: 'test2',
      state: '',
      createdBy: '',
      createdDate: '2021-10-02T07:03:06.167Z',
      files: [{ progressOcr: { pending: true, total: '92' }, filesNormal: 'assets/files/test.pdf', progressExtract: { pending: false } }],
      loaivanban: '',
      coquanbanhanh: '',
      sovanban: '',
      nguoiky: '',
      isOcr: true,
    },
    {
      id: 'bvbbvcbcvbcb',
      name: 'test3',
      state: '',
      createdBy: 'admin',
      createdDate: '2021-10-02T07:03:06.167Z',
      files: [
        { progressOcr: { pending: true, total: '60' }, filesNormal: 'assets/files/test1.PNG', progressExtract: { pending: false } },
        { progressOcr: { pending: false }, filesOcr: 'assets/files/test.pdf', progressExtract: { pending: true } },
      ],
      loaivanban: '',
      coquanbanhanh: '',
      sovanban: '',
      nguoiky: '',
      isOcr: true,
      isExtract: true,
    },
    {
      id: 'zcxzczczxcxcasdad',
      name: 'test4',
      state: '',
      createdBy: 'admin',
      createdDate: '2021-10-02T07:03:06.167Z',
      files: [
        { progressOcr: { pending: false }, filesNormal: 'assets/files/test1.PNG', progressExtract: { pending: false } },
        { progressOcr: { pending: false }, filesOcr: 'assets/files/test.pdf', progressExtract: { pending: false } },
        { progressOcr: { pending: false }, filesExtract: 'assets/files/test.txt', progressExtract: { pending: false } },
      ],
      loaivanban: 'hành chính',
      coquanbanhanh: 'Bộ lao động',
      sovanban: 'TT-13',
      nguoiky: 'Nguyễn Tấn Dũng',
      isOcr: false,
      isExtract: false,
    },
  ];
  res.status(200).json({
    message: 'Post fetched successfully!',
    data: data,
  });
});

module.exports = app;
