var Course = require.main.require('./models/Course');
var Users = require.main.require('./models/Users');
var Roles = require.main.require('./models/Roles');

const controller = 'Course';
const module_name = 'Course';

/**
 * List all Course
 */
async function list(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'list';
    const allCourse = await Course.find({}).populate('author_id');
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
            title: input.title,
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

    res.render('admin/'+controller+'/add',{page_title:page_title,data:data, learners: learners, errorData:errorData,controller:controller,action:action});
}
exports.add = add;

/**
 * Edit Course
 */
async function edit(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    let errorData = {};
    let action = 'edit';

    if (req.params.id) {
        const course = await Course.findById(req.params.id).populate("learners");
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
                title: input.title,
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

        res.render("admin/courses/edit", { page_title:page_title, data:course, learners: learners, errorData:errorData,controller:controller,action:action });
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
