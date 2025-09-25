var express = require('express');
var router = express.Router();

let connection_config = require("../config/config");
let v_name = connection_config.version_name;
let v_code = connection_config.version_code; 

let rateLimit = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 120 * 60 * 1000, // Blocked for 2 hour from Last hit
	max: 5, // Limit each IP to 5 requests per windowMs
	keyGenerator: (req, res) => {
		// console.log("dealer login Client IP: ", req.ip)
		let email = req.body?.email?.toLowerCase();
		return (email ? `${email}_${req.ip}` : req.ip);
	},
	handler: (req, res, next) => {
		res.status(401).json({error:1,message: 'Too many requests, please try again later.'});
	},
	message: "Too many requests, please try again later.",
	headers: true, // Sends rate limit info in response headers
});

var ApiController = require('../controllers/api/ApiController');
var ApiMiddleware = require('../middleware/ApiMiddleware');

/** Routes for Frontend & App Users  */

/**
 * @route POST /api/login
 * @group api - Authentication
 * @param {string} email.body.required - User email
 * @param {string} password.body.required - User password
 * @returns {object} 200 - { success: true, token: "JWT_TOKEN" }
 * @returns {Error} 401 - Invalid credentials
 */    
router.post('/login', limiter, ApiController.login);     
//router.post('/dashboard', limiter, ApiMiddleware, ApiStudentController.dashboard);  

/**
 * @route POST /api/logout
 * @group api - Authentication
 * @security JWT
 * @returns {object} 200 - { success: true, message: "Logged out successfully" }
 */
router.post('/logout', limiter, ApiController.logout);


var courseController = require('../controllers/api/ApiCourseController');

/**
 * @typedef Course
 * @property {string} title.required - Course Title
 * @property {string} type.required - Type of course (classroom | elearning)
 * @property {string} content - Course content/description
 * @property {string} category - Category ObjectId
 * @property {string} status - Course status (draft | published)
 * @property {array} videos - Array of video URLs or embed codes
 * @property {array} learners - Array of learner ObjectIds
 */

/**
 * Get list of all courses
 * @route POST /api/courses
 * @group Courses - Course management
 * @returns {Array.<Course>} 200 - List of courses
 */
router.post('/courses', ApiMiddleware, courseController.list);

/**
 * Get single course by ID
 * @route POST /api/courses/{id}
 * @group Courses - Course management
 * @param {string} id.path.required - Course ID
 * @returns {Course.model} 200 - Course object
 * @returns {Error} 404 - Course not found
 */
router.post('/courses/:id', ApiMiddleware, courseController.getById);

/**
 * @route GET /api/version_check
 * @group api - Version
 * @returns {object} 200 - An array of version objects
 * @returns {Error} 401 - Unexpected error
 */
router.get('/version_check', function(req, res, next) {
	let response = {success:1,data: {version_name: v_name, version_code: v_code, mandatory: false} , message: "version details succcesfully fetched"};
	res.json(response);
})

module.exports = router;        
