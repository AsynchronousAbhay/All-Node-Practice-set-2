var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

const File = require('../models/fileSchema');

router.get('/', function (req, res, next) {

  const createdFile = {
    filename: req.body.filename
  };

  File.findOne({ createdFile })
    .then(() => {
      const files = fs.readdirSync(
        path.join(
          __dirname, "..", "public", "fileFolder"
        ),
        "utf-8"
      );
      res.render('index', { files, filedata: null, filename:null });
    })
    .catch((err) => {
      res.send(err)
    });

});

router.get('/file/:filename', function (req, res, next) {

  const createdFile = {
    filename: req.body.filename
  };

  File.findOne({ createdFile })
    .then(() => {
      const files = fs.readdirSync(
        path.join(
          __dirname, "..", "public", "fileFolder"
        ),
        "utf-8"
      );
      const filedata = fs.readFileSync(
        path.join(
          __dirname, "..", "public", "fileFolder", req.params.filename
        ),
        "utf-8"
      );
      res.render('index', { files, filedata, filename:req.params.filename });
    })
    .catch((err) => {
      res.send(err)
    });

});

router.post('/create', function (req, res, next) {

  File.create({ filename: req.body.filename })
    .then((fileCreated) => {
      fs.writeFileSync(
        path.join(
          __dirname, "..", "public", "fileFolder", req.body.filename
        ),
        "hello!!"
      )
      res.redirect('/');
    })
    .catch((err) => {
      res.send(err)
    });

});

router.get('/delete/:filename', function (req, res, next) {

  File.deleteOne()
    .then((deletedData) => {
      fs.unlinkSync(
        path.join(
          __dirname, "..", "public", "fileFolder", req.params.filename
        )
      );
      res.redirect('/');
    })
    .catch((err) => {
      res.send(err)
    });

});

router.post('/update/:filename', function (req, res, next) {
  File.updateOne()
  .then(()=>{
    fs.writeFileSync(
      path.join(
        __dirname, "..", "public", "fileFolder", req.params.filename
      ),
      req.body.filedata
    );
    res.redirect('/');
  })
  .catch((err)=>{
    res.send(err)
  });
});


module.exports = router;
