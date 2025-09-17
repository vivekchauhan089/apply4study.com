const express = require('express');

const auth = require('../middleware/auth');
const oauth = require('../middleware/oauth');
const jwtauth = require('../middleware/jwtauth');
const stripe = require("stripe");
const bodyParser = require("body-parser");

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get('/', (req, res) => {
  res.send('Home Page');
});

userRouter
  .route('/login')
  .get((req, res) => {
    res.send('Login Page');
  })
  .post(auth.login, jwtauth.login);

userRouter
  .route('/register')
  .get((req, res) => {
    res.send('Sign Up Page');
  })
  .post(auth.register);

userRouter.get('/dashboard', auth.ensureAuthenticated, (req, res) => {
  res.send('Dashboard');
});

// oauth routes
userRouter.get('/auth/google', oauth.login);
userRouter.get('/auth/google/callback', oauth.callback, jwtauth.ologin);

userRouter.post("/charge", (req, res) => {
  const amount = 2500;
  res.send("Success");
});

userRouter.get("/myCourses", async (req, res) => {
  if (req.isAuthenticated()){
    const course = await Course.find().populate("courses");
    res.send(course)
  } else {
    res.render("/signIn")
  }
})
userRouter.get("/addCourse", (req, res)=>{
  if (req.isAuthenticated()) {
    res.render("addCourse");
  } else {
    res.render("signIn");
  }
});
userRouter.post("/addCourse", (req, res) => {
  if (req.isAuthenticated()) {
    const username = req.body.username;
    if (req.user.role == "instructor") {
      const newCourse = new Course({
        username,
        instructor: req.user._id,
      });
      newCourse.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          res.send("success")
        }
      })
    }
    if (req.user.role == "student") {
      Course.find({username: username}, function(err, foundCourse){
        if (err) {
          console.log(err);
        } else {
          User.update({username: req.user.username}, {$push: {courses: foundCourse}});
          res.send("success")
        }
      })
    }
  }
})
userRouter.get("/allcourse", async (req, res) => {
  const courses = await Course.find().populate();
  const allCourse = [];
  courses.forEach(course => {
    allCourse.push(course.username)
  });
  res.send(allCourse)
})

userRouter.put("/courses/:courseId", async (req, res) => {
  if (req.isAuthenticated() && req.user.role == "admin") {
    const course = await Course.findByIdAndUpdate(req.params.courseId, {$set: req.body}, {new: true});
  res.send(course);
  } else {
    res.send("Restricted access")
  } 
})

userRouter.put("/user/:userId", async (req, res) => {
  if (req.isAuthenticated() && req.user.role == "admin") {
    const user = await User.findByIdAndUpdate(req.params.courseId, {$set: req.body}, {new: true});
    res.send(user);
  } else {
    res.send("Restricted access")
  }
});

userRouter.get("/courses/:courseId", async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  res.send(course.quiz1);
  //json parse se nahi hogaa
});
userRouter.get("/course/:courseId", async (req, res) => {
    const course = await Course.findById(req.params.courseId).populate();
    res.send(course);
})

module.exports = userRouter;
