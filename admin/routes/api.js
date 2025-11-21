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

var LoginController = require('../controllers/api/LoginController');
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
router.post('/login', limiter, LoginController.login);     
//router.post('/dashboard', limiter, ApiMiddleware, ApiStudentController.dashboard);  

/**
 * @route POST /api/logout
 * @group api - Authentication
 * @security JWT
 * @returns {object} 200 - { success: true, message: "Logged out successfully" }
 */
router.post('/logout', limiter, LoginController.logout);


var courseController = require('../controllers/api/CourseController');

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
router.post("/course/progress", ApiMiddleware, courseController.updateProgress);


/**
 * @swagger
 * /progress/{userId}/{courseId}:
 *   post:
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
router.post("/course/progress", ApiMiddleware, courseController.updateProgress);


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


var ApiChatController = require('../controllers/api/ChatController');
/**
 * @typedef Chat
 * @property {string} query.required - User message text
 */

/**
 * Generate AI-based response for users
 * @route POST /api/chat
 * @group Chat - Chat management
 * @param {Chat.model} Chat.body.required - Chat message input
 * @returns {object} 200 - { success: true, reply: "Response message" }
 * @returns {Error}  default - Unexpected error
 */
router.post('/chat', ApiMiddleware, ApiChatController.createReply);

const ApiSubscriptionController = require("../controllers/api/SubscriptionController");

/**
 * @typedef Subscription
 * @property {string} contact.required - Email or mobile number
 */

/**
 * Subscribe user (email or mobile)
 * @route POST /api/subscribe
 * @group Subscription - User Subscription Management
 * @param {Subscription.model} Subscription.body.required - Subscription input
 * @returns {object} 201 - { success: true, message: "Subscribed successfully", subscription: {...} }
 * @returns {Error} 409 - Already subscribed
 */
router.post("/subscribe", ApiSubscriptionController.subscribe);

/**
 * Unsubscribe user by contact (email or mobile)
 * @route DELETE /api/unsubscribe/{contact}
 * @group Subscription - User Subscription Management
 * @param {string} contact.path.required - Email or mobile number
 * @returns {object} 200 - { success: true, message: "Unsubscribed successfully" }
 * @returns {Error} 404 - Subscription not found
 */
router.delete("/unsubscribe/:contact", ApiSubscriptionController.unsubscribe);


const ApiUserController = require("../controllers/api/UserController");

/**
 * @typedef User
 * @property {string} first_name.required
 * @property {string} last_name
 * @property {string} email.required
 * @property {string} mobile_number
 * @property {string} password.required
 * @property {string} role
 */

/**
 * Register a new user
 * @route POST /api/register
 * @group User - User management
 * @param {User.model} User.body.required - User registration data
 * @returns {object} 200 - { success: true, message: "User registered successfully" }
 * @returns {Error}  default - Unexpected error
 */
router.post("/register", ApiMiddleware, ApiUserController.register);

/**
 * Forgot password (generate reset token)
 * @route POST /api/forgot_password
 * @group User - User management
 * @param {string} email.body.required - Registered email address
 * @returns {object} 200 - { success: true, message: "Reset link sent" }
 * @returns {Error}  default - Unexpected error
 */
router.post("/forgot_password", ApiMiddleware, ApiUserController.forgotPassword);

/**
 * Set a new password
 * @route POST /api/set_password
 * @group User - User management
 * @param {string} email.body.required - User email
 * @param {string} token.body.required - Reset token
 * @param {string} new_password.body.required - New password
 * @returns {object} 200 - { success: true, message: "Password updated successfully" }
 * @returns {Error}  default - Unexpected error
 */
router.post("/set_password", ApiMiddleware, ApiUserController.setPassword);

/**
 * Update user details
 * @route PUT /api/update_user/{id}
 * @group User - User management
 * @param {string} id.path.required - User ID
 * @param {User.model} User.body.required - Updated user data
 * @returns {object} 200 - { success: true, message: "User updated successfully" }
 * @returns {Error}  default - Unexpected error
 */
router.put("/update_user/:id", ApiMiddleware, ApiUserController.updateUser);


const ApiPlanController = require("../controllers/api/PlanController");

/**
 * @route POST /api/plan/fetchall
 * @group Plan
 * @param {object} body - { plan_id, plan_name, amount }
 */
router.get("/plan/fetchall", ApiPlanController.getAllPlans);

/**
 * @route POST /api/plan/create
 * @group Plan
 * @param {object} body - { plan_name, amount }
 */
router.post("/plan/create", ApiPlanController.createPlan);


const ApiPaymentController = require("../controllers/api/PaymentController");

/**
 * @route POST /api/payment/create
 * @group Payment
 * @param {object} body - { plan_name, amount, gateway }
 */
router.post("/payment/create", ApiPaymentController.createOrder);

/**
 * @route POST /api/payment/verify
 * @group Payment
 * @param {object} body - payment verification data
 */
router.post("/payment/verify", ApiPaymentController.verifyPayment);


const ApiBlogController = require("../controllers/api/BlogController");

/**
 * Fetch all published blogs
 * @route POST /api/blog/fetchall
 * @group Blog - Blog management
 * @param {string} category.query - Optional category filter
 * @param {string} tag.query - Optional tag filter
 * @param {boolean} featured.query - Filter featured blogs only
 * @returns {object} 200 - { success: true, data: [Blog] }
 * @returns {Error}  default - Unexpected error
 */
router.post("/blog/fetchall", ApiBlogController.getAllBlogs);

/**
 * Fetch single blog details by slug
 * @route POST /api/blog/{slug}
 * @group Blog - Blog management
 * @param {string} slug.path.required - Blog slug
 * @returns {object} 200 - { success: true, data: Blog }
 * @returns {Error}  default - Blog not found
 */
router.post("/blog/:slug", ApiBlogController.getBlogBySlug);


const MenuController = require('../controllers/api/MenuController');

/**
 * Fetch all menus
 * @route POST /api/menu/fetchall
 * @group Menu - Menu management
 * @returns {object} 200 - { success: true, data: [Menu] }
 * @returns {Error}  default - Unexpected error
 */
router.post('/menu/fetchall', MenuController.getAllMenus);

/**
 * Create a new menu
 * @route POST /api/menu/create
 * @group Menu - Menu management
 * @param {Menus.model} Menu.body.required - Menu details
 * @returns {object} 201 - { success: true, data: Menu }
 * @returns {Error}  default - Unexpected error
 */
router.post('/menu/create', MenuController.createMenu);


const PageController = require('../controllers/api/PageController');

/**
 * Fetch all pages with matching menus
 * @route POST /api/page/fetchall
 * @group Page - Page management
 * @returns {object} 200 - { success: true, data: [Page] }
 * @returns {Error}  default - Unexpected error
 */
router.post('/page/fetchall', PageController.getAllPages);

/**
 * Create a new page
 * @route POST /api/page/create
 * @group Page - Page management
 * @param {Page.model} Page.body.required - Page details
 * @returns {object} 201 - { success: true, data: Page }
 * @returns {Error}  default - Unexpected error
 */
router.post('/page/create', PageController.createPage);


const SmsController = require("../controllers/SmsController");

/**
 * Send OTP to a mobile number
 * @route POST /api/sms/send
 * @group SMS - OTP Management
 * @param {string} mobile_no.body.required - Recipient mobile number
 * @returns {object} 200 - { success: true, message: "OTP sent", token_id }
 * @returns {Error}  default - Unexpected error
 */
router.post('/sms/send', SmsController.sendSmsOtp);

/**
 * Verify OTP
 * @route POST /api/sms/verify
 * @group SMS - OTP Management
 * @param {string} mobile_no.body.required - Mobile number
 * @param {string} otp.body.required - OTP (6 digits)
 * @returns {object} 200 - { success: true, message: "OTP verified", token_status }
 * @returns {Error}  default - Unexpected error
 */
router.post('/sms/verify', SmsController.verifySmsOtp);

/**
 * Expire OTP Token Manually or Via CRON
 * @route POST /api/sms/expire
 * @group SMS - OTP Management
 * @param {string} token_id.body.required - Token ID
 * @returns {object} 200 - { success: true, message: "Token expired" }
 * @returns {Error}  default - Unexpected error
 */
router.post('/sms/expire', SmsController.expireToken);


const NotificationController = require("../controllers/NotificationController");

/**
 * Send a notification
 * @route POST /api/notification/send
 * @group Notification - Notification management
 * @returns {object} 201 - { success: true, data: Notification }
 */
router.post("/notification/send", NotificationController.sendNotification);

/**
 * Fetch notifications (paginated)
 * @route POST /api/notifications
 * @group Notification
 * @returns {object} 200 - Paginated notification response
 */
router.post("/notifications", NotificationController.getUserNotifications);

/**
 * Mark notification as read
 * @route POST /api/notification/markread
 * @group Notification - Notification management
 * @returns {object} 200 - Status message
 */
router.post("/notification/markread", NotificationController.markAsRead);

/**
 * Delete notification
 * @route POST /api/notification/delete
 * @group Notification - Notification management
 * @returns {object} 200 - Status message
 */
router.post("/notification/delete", NotificationController.deleteNotification);


module.exports = router;        
