var Course = require.main.require('./models/Course');
var Users = require.main.require('./models/Users');
var Roles = require.main.require('./models/Roles');
var Category = require.main.require('./models/Category');

const config = require('../../config/config');
const path = require("path");
const fs = require("fs");
const QRCode = require('qrcode');

const controller = 'Course';
const module_name = 'Course';

/**
 * List all Course
 */
async function list(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'list';
    
    const allCourse = await Course.find({}).populate('category');
    
    res.render('admin/Course/list', {
        page_title: "Course List",
        data: allCourse,
        controller,
        module_name,
        action
    });
}
exports.list = list;

/**
 * Add Course
 */
async function add(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    let errorData = {};
    let data = {};
    let action = 'add';
    let page_title = 'Add Course';

    if (req.method === "POST") {
        try {
          const input = req.body;

          let videos = [];
          if (input.videoUrls) {
            videos = input.videoUrls.map(url => ({
              url,
              type: url.includes("youtube") || url.includes("vimeo") ? "embed" : "upload"
            }));
          }

          const newCourse = new Course({
            courseName: input.courseName,
            type: input.type,
            content: input.content,
            category: input.category,
            status: input.status || "draft",
            videos,
            learners: input.learners || []
          });

          await newCourse.save();
          req.flash("success", "Course added successfully");
          return res.redirect('admin/'+controller+'/list');

        } catch (err) {
          console.error(err);
          req.flash("error", "Error adding course");
          return res.redirect('admin/'+controller+'/add');
        }
    }

    var userRole = await Roles.findOne({ name: 'student' });
    var learners = await Users.find({ role_id: userRole._id });
    var categories = await Category.find({});

    res.render('admin/'+controller+'/add',{page_title:page_title,data:data, categories: categories, learners: learners, errorData:errorData,controller:controller,action:action});
}
exports.add = add;

/**
 * Edit Course
 */
async function edit(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    let errorData = {};
    let action = 'edit';
    let page_title = 'Edit Course';

    if (req.params.id) {
        const course = await Course.findById(req.params.id).populate("learners");
        const categories = await Category.find({});
        if (req.method === "POST") {
            try {
              const input = req.body;
              let videos = [];
              if (input.videoUrls) {
                videos = input.videoUrls.map(url => ({
                  url,
                  type: url.includes("youtube") || url.includes("vimeo") ? "embed" : "upload"
                }));
              }

              await Course.findByIdAndUpdate(req.params.id, {
                courseName: input.courseName,
                type: input.type,
                content: input.content,
                category: input.category,
                status: input.status,
                videos,
                learners: input.learners || []
              });

              req.flash("success", "Course updated successfully");
              return res.redirect(nodeAdminUrl + "/" + controller + "/list");

            } catch (err) {
              console.error(err);
              req.flash("error", "Error updating course");
              return res.redirect(nodeAdminUrl + "/" + controller + `/edit/${req.params.id}`);
            }
        }

        var userRole = await Roles.findOne({ name: 'student' });
        var learners = await Users.find({ role_id: userRole._id });

        res.render('admin/'+controller+'/add', { page_title:page_title, data:course, categories: categories, learners: learners, errorData:errorData,controller:controller,action:action });
    } else {
        req.flash("error", "Invalid URL");
        return res.redirect(nodeAdminUrl + "/" + controller + "/list");
    }
}
exports.edit = edit;

/**
 * Delete Course
 */
async function deleteRecord(req, res) {
  if (req.params.id) {
    await Course.findByIdAndRemove(req.params.id);
    req.flash("success", "Course deleted successfully.");
    return res.redirect(nodeAdminUrl + "/" + controller + "/list");
  } else {
    req.flash("error", "Invalid URL");
    return res.redirect(nodeAdminUrl + "/" + controller + "/list");
  }
}
exports.deleteRecord = deleteRecord;

async function generateQr(req, res) {
  try {
    if (req.params.id) {
      const courseId = req.params.id;
      const course = await Course.findById(courseId); // Make sure Course model is imported

      if (!course) return res.status(404).json({ success: false, msg: 'Course not found' });

      const courseUrl = `${config.siteUrl}/course/${course._id}`;
      const title = course.title;

      /*const qrDataUrl = await QRCode.toDataURL(courseUrl, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        margin: 1,
        width: 300
      });*/

      const qrDir = path.join(__dirname, "../../public/qrcodes");
      if (!fs.existsSync(qrDir)) fs.mkdirSync(qrDir);

      const fileName = `${course._id}-qr.png`;
      const filePath = path.join(qrDir, fileName);

      // Data inside QR (title + URL)
      //const qrData = `Course: ${course.courseName} @Apply4study\nURL: ${courseUrl}`;
      const qrData = `${courseUrl}`;

      await QRCode.toFile(filePath, qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff"
        }
      });

      const qrUrl = `Scan QRCode to Enroll this course @Apply4study - ${config.baseUrl}/qrcodes/${fileName}`;

      res.json({ success: true, qr: qrUrl, url: courseUrl, title });
    } else {
      res.status(401).json({ success: false, msg: 'QR code not generated' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

exports.generateQr = generateQr;