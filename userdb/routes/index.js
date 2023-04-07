var express = require('express');
var router = express.Router();

const test = require("../model/testModel");

router.get('/', function (req, res, next) {
  test.findOne( test.username )
    .then((user) => {
      res.render('index', { user });
    })
    .catch((err) => {
      res.send(err.message);
    })
});


router.post('/create', function (req, res, next) {
  const username = req.body.username;
  test.create({ username })
    .then((createdUser) => {
      res.redirect('/');
    })
    .catch((err) => {
      res.send(err);
    })

});


module.exports = router;
