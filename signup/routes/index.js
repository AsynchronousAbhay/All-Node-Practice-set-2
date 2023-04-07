var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/signup', function(req, res, next) {
  const {name, username, password} = req.body
  res.render('timeline',{ name , username, password, valid:true});
});

module.exports = router;
