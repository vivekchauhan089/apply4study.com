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
 * @swagger
 * components:
 *   schemas:
 *     Progress:
 *       type: object
 *       required:
 *         - userId
 *         - courseId
 *         - lessonId
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user
 *         courseId:
 *           type: string
 *           description: ID of the course
 *         lessonId:
 *           type: string
 *           description: ID of the lesson
 *         progress:
 *           type: number
 *           description: Progress percentage (0–100)
 *         completed:
 *           type: boolean
 *           description: Whether the lesson is completed
 *       example:
 *         userId: 650ab1234f1b2c3d4e5f6789
 *         courseId: 650ab9876f1b2c3d4e5f1234
 *         lessonId: 650ab1111f1b2c3d4e5f2222
 *         progress: 50
 *         completed: false
 */

/**
 * @swagger
 * /progress:
 *   post:
 *     summary: Save or update lesson progress
 *     tags: [Progress]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Progress'
 *     responses:
 *       200:
 *         description: Progress saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 data:
 *                   userId: "650ab1234f1b2c3d4e5f6789"
 *                   courseId: "650ab9876f1b2c3d4e5f1234"
 *                   lessonId: "650ab1111f1b2c3d4e5f2222"
 *                   progress: 75
 *                   completed: false
 */
router.post("/progress", ApiMiddleware, courseController.updateProgress);


/**
 * @swagger
 * /progress/{userId}/{courseId}:
 *   get:
 *     summary: Get progress for a specific course
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *     responses:
 *       200:
 *         description: List of progress records for that user & course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 data:
 *                   - lessonId: "650ab1111f1b2c3d4e5f2222"
 *                     progress: 100
 *                     completed: true
 *                   - lessonId: "650ab2222f1b2c3d4e5f3333"
 *                     progress: 50
 *                     completed: false
 */
router.post("/progress/:userId/:courseId", ApiMiddleware, courseController.updateProgress);


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
