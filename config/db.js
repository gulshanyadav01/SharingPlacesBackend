const mongoose =require("mongoose")
const express = require("express");

const MongoDb = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    })
    .then(result =>{
        console.log("conntected to database".yellow.bold.underline);
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = MongoDb;