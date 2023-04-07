const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/vsmongoDb")
    .then(() => {
        console.log("connected!!");
    })
    .catch((err) => {
        console.log(err.message);
    });