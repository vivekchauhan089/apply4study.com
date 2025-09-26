let router = require('express').Router();
let config = require('../../config/config');
let APIBody = require('../../lib/APIBody');
let BodyCheck = require('../../lib/bodyCheck');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let connection = require('mysql').createPool(config.database);
let sendgridemail = require('../../lib/email');
let rn = require('random-number');
let notificationContent = require('../../lib/notificationContent');
let util = require('util');
var request = require('request');

var Course = require.main.require('./models/Course');
var CourseProgress = require.main.require("./models/CourseProgress");

// Fetch all courses from the system
async function list (req,res,next) {
	let body = APIBody.find(e => e.method == 'post' && e.name == 'courses');
    if(!(BodyCheck.checkBody(req.body,body.body)).success) {
		console.log('parameter not find');
		res.status(200).json({success : false ,message : 'Required parameter is missing'});
	} else {
		connection.getConnection(async(error,tempConnection)=>{
			if(error){
				console.log("connection error ",error.message);
				let response = {error: 1, message: 'Unable to connect to the DB. Try again'};
				res.status(504).json(response);
			} else {
				const allCourse = await Course.find({}).populate('category');
				res.status(200).json({
					success: true,
					data: allCourse,
					message: 'courses list successfully'
				});

			}
		});
	}
}

// Fetch a course info from the system
async function getById (req,res,next) {
	if(req.body.course_id == 'undefined' || req.body.course_id == null || req.body.course_id == "" ){
		console.log('parameter not find');
		res.status(400).json({error : 1 ,message : 'Required parameter is missing'});	
	} else {
		connection.getConnection(async(error,tempConnection)=>{
			if(error){
				console.log("connection error ",error.message);
				let response = {error: 1, message: 'Unable to connect to the DB. Try again'};
				res.status(504).json(response);
			} else {
				var course_id = req.body.course_id;
				var coursedata = await Course.findById(course_id).populate('category');

				res.status(200).json({
					success: true,
					data: coursedata,
					message: 'courses data successfully'
				});

			}
		});
	}
}

// Save or update progress
async function updateProgress(req, res) {
  try {
    const { userId, courseId, lessonId, progress, completed } = req.body;

    const record = await CourseProgress.findOneAndUpdate(
      { userId, courseId, lessonId },
      { progress, completed, lastUpdated: new Date() },
      { upsert: true, new: true }
    );

    res.json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Get progress for a course
async function getProgress(req, res) {
  try {
    const { userId, courseId } = req.params;
    const progress = await CourseProgress.find({ userId, courseId });
    res.json({ success: true, data: progress });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {list, getById, updateProgress, getProgress};