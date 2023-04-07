var express = require('express');
var router = express.Router();

const upload = require('./multer');
const uuid = require("uuid").v4;
const fs = require("fs");
const path = require("path");

const Gallery = require('../models/config');

let localDB = [
  {
    id: "akhf-afnf-43f-afq3",
    title: "vergil",
    author: "abhay",
    image: 'image-01.jpg'
  }
]

router.get('/', function (req, res, next) {
  Gallery.find()
    .then((cards) => {
      res.render('show', { cards });
    })
    .catch((err) => {
      res.send(err);
    });

});

router.get('/create', function (req, res, next) {
  res.render('create');
});

router.post('/create', function (req, res, next) {

  upload(req, res, function (err) {
    if (err) return res.send(err);

    const { title, author } = req.body;

    const newImage = {
      title,
      author,
      image: req.file.filename,
    };

    Gallery.create(newImage)
      .then((galleryCreated) => {
        res.redirect('/');
        // res.json(galleryCreated);
      })
      .catch((err) => {
        res.send(err)
      });

  });

});

router.get('/update/:id', function (req, res, next) {

  Gallery.findById(req.params.id)
    .then((card) => {
      res.render('update', { card });
    })
    .catch((err) => {
      res.send(err)
    });

});


router.post('/update/:id', function (req, res, next) {

  upload(req, res, function (err) {
    if (err) return res.send(err);

    // const id = req.params.id;
    // const cardIndex = localDB.findIndex((indx)=>{
    //   return indx.id === id;
    // });

    const imageUpdated = {
      title: req.body.title,
      author: req.body.author
    };
    if (req.file) {
      fs.unlinkSync(
        path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          req.body.oldimage
        )
      );
      imageUpdated.image = req.file.filename;
    };

    Gallery.findByIdAndUpdate(req.params.id, imageUpdated)
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        res.send(err)
      });

    // res.json(imageUpdated);

  });

});

router.get('/delete/:id', function (req, res, next) {

  Gallery.findByIdAndDelete(req.params.id)
  .then((deletedGallery)=>{
    fs.unlinkSync(
      path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        deletedGallery.image
      )
    );
    res.redirect('/');
  })
  .catch((err)=>{
    res.send(err);
  });



});



module.exports = router;
