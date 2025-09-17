const express = require("express");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const passportLocalMongoose = require("passport-local-mongoose");

////////////////////----- Course Schema -----////////////////////

const courseSchema = new mongoose.Schema({
    username : {
        type: String,
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    instructor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    price: {
        type: String,
    },
    quiz1Marks: {
        type: Number
    },
    finalquizMarks: {
        type: Number
    },
    quiz1: {
        type: String
    },
    finalQuiz: {
        type: String
    },
    details: {
      type: String
    },
    data: [{type: String}]
});

courseSchema.plugin(passportLocalMongoose);

////////////////////----- Export -----////////////////////

module.exports = mongoose.model("Course", courseSchema);