var express = require('express');
var router = express.Router();

const File = require('../models/fileSchema');

router.get('/', function (req, res, next) {

  File.find()
    .then((files) => {
      res.render('index',  { files });
    })
    .catch((err)=>{
      res.send(err)
    })

});

router.post('/create', function (req, res, next) {

  File.create({ filename: req.body.filename })
    .then((fileCreated) => {
      res.redirect('/');
    })
    .catch((err) => {
      res.send(err)
    });

});





module.exports = router;
