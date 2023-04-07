var express = require('express');
var router = express.Router();

const uuid = require("uuid").v4;

let localDB = [
  {
    id: 'n342r-fefas-323r3',
    title: 'title-01',
    desc: 'desc-01',
    deadline: '1st-jan-2023',
  }
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('show', { tasks: localDB });
});

router.get('/create', function (req, res, next) {
  res.render('create');
});

router.post('/create', function (req, res, next) {

  const id = uuid();

  const { title, desc } = req.body;

  let deadline = new Date().toLocaleDateString("en-us", {
    day: 'numeric',
    month: "long",
    year: "numeric",
  })

  const newTask = {
    id,
    title,
    desc,
    deadline
  };

  // localDB[0]= newTask;
  localDB.push(newTask);

  res.redirect('/');

});

router.get('/delete/:id', function (req, res, next) {

  const id = req.params.id;

  const filtereddata = localDB.filter((task) => {
    return task.id !== id;
  });

  // res.json(filtereddata);

  localDB = filtereddata;

  res.redirect('/');

});

router.get('/edit/:id', function (req, res, next) {

  const id = req.params.id;

  const taskdata = localDB.filter((task) => {
    return task.id === id;
  })

  // res.json(taskdata);

  res.render('edit', { task: taskdata[0] });
});


router.post('/edit/:id', function (req, res, next) {

  const id = req.params.id;

  const { title, desc } = req.body;

  const taskindex = localDB.findIndex((task) => {
    return task.id === id;
  });

  // res.json(taskindex)

  const updatateddata = { ...localDB[taskindex], title, desc };

  localDB[taskindex] = updatateddata;

  res.redirect('/');

});


module.exports = router;
