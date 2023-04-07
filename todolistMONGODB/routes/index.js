var express = require('express');
var router = express.Router();

const Task = require('../models/taskSchema');

/* GET home page. */
router.get('/', function (req, res, next) {

  Task.find()
    .then((tasks) => {
      res.render('show', { tasks });
    })
    .catch((err) => {
      res.send(err)
    });

});

router.get('/create', function (req, res, next) {
  res.render('create');
});

router.post('/create', function (req, res, next) {

  Task.create(req.body)
    .then((taskcreated) => {
      res.redirect('/');
      // res.json(taskcreated);
    })
    .catch((err) => {
      res.send(err)
    });

});

router.get('/delete/:id', function (req, res, next) {

  Task.findByIdAndDelete(req.params.id, req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      res.send(err)
    });


});

router.get('/edit/:id', function (req, res, next) {

  Task.findById(req.params.id)
    .then((task) => {
      res.render('edit', { task });
    })
    .catch((err) => {
      res.send(err)
    });

});


router.post('/edit/:id', function (req, res, next) {

  Task.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      res.send(err)
    });

});


module.exports = router;
