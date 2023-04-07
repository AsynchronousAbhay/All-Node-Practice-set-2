const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  desc: String,
  date:{
    type: Date,
    default: Date.now,
  }  
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
