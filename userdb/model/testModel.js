const mongoose = require("mongoose");


const testModel = new mongoose.Schema({
    username: String,
})

const test  = mongoose.model("test", testModel);

module.exports = test;

