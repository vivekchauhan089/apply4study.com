var Category = require.main.require('./models/Category');
var Users = require.main.require('./models/Users');
var Roles = require.main.require('./models/Roles');

const controller = 'Category';
const module_name = 'Category';

/**
 * List all Category
 */
async function list(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'list';
    const allCategory = await Category.find({}).populate('author_id');
    res.render('admin/Category/list', {
        page_title: "Blog List",
        data: allCategory,
        controller,
        module_name,
        action
    });
}
exports.list = list;

/**
 * Add Blog
 */
async function add(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    let errorData = {};
    let data = {};
    let action = 'add';
    let page_title = 'Add Blog';

    var authorRole = await Roles.findOne({ name: 'author' });
    var authors = await Users.find({ role_id: authorRole._id });

    if (req.method === "POST") {
        let input = JSON.parse(JSON.stringify(req.body));

        req.checkBody("title", "Title is required").notEmpty();
        req.checkBody("content", "Content is required").notEmpty();

        const errors = req.validationErrors();
        if (errors) {
            errors.forEach(err => {
                errorData[err.param] = err.msg;
            });
            data = input;
        } else {
          // Upload Image
            if (req.files && req.files.image) {
                let blogImage = req.files.image;
                let filename = Date.now() + "-" + blogImage.name;
                input.image = filename;
                blogImage.mv("public/upload/" + filename, err => {
                    if (err) console.log("Image upload error", err);
                });
            }

            const SaveData = new Category(input);
            const saveResult = await SaveData.save();
            if (saveResult) {
                req.flash("success", controller + " added successfully.");
                return res.redirect(nodeAdminUrl + "/" + controller + "/list");
            } else {
                req.flash("error", "Could not save blog. Try again!");
            }
        }
    }

    res.render('admin/'+controller+'/add',{page_title:page_title,data:data, authors: authors, errorData:errorData,controller:controller,action:action});
}
exports.add = add;

/**
 * Edit Blog
 */
async function edit(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    let errorData = {};
    let action = 'edit';

    if (req.params.id) {
        let blog = await Category.findById(req.params.id);
        var authorRole = await Roles.findOne({ name: 'author' });
        var authors = await Users.find({ role_id: authorRole._id }); 
        if (!blog) {
            req.flash("error", "Invalid Blog ID");
            return res.redirect(nodeAdminUrl + "/" + controller + "/list");
        }

        if (req.method === "POST") {
            let input = JSON.parse(JSON.stringify(req.body));
            req.checkBody("title", "Title is required").notEmpty();
            req.checkBody("content", "Content is required").notEmpty();

            const errors = req.validationErrors();
            if (errors) {
                errors.forEach(err => {
                  errorData[err.param] = err.msg;
                });
            } else {
                if (req.files && req.files.image) {
                  let blogImage = req.files.image;
                  let filename = Date.now() + "-" + blogImage.name;
                  input.image = filename;
                  blogImage.mv("public/upload/" + filename, err => {
                    if (err) console.log("Image upload error", err);
                  });
                }
                await Category.findByIdAndUpdate(req.params.id, { $set: input });
                req.flash("success", "Blog updated successfully.");
                return res.redirect(nodeAdminUrl + "/" + controller + "/list");
            }
        }

        res.render('admin/Category/edit', {
            page_title: "Edit Blog",
            data: blog,
            authors: authors,
            errorData,
            controller,
            action
        });
    } else {
        req.flash("error", "Invalid URL");
        return res.redirect(nodeAdminUrl + "/" + controller + "/list");
    }
}
exports.edit = edit;

/**
 * Delete Blog
 */
async function deleteRecord(req, res) {
  if (req.params.id) {
    await Category.findByIdAndRemove(req.params.id);
    req.flash("success", "Blog deleted successfully.");
    return res.redirect(nodeAdminUrl + "/" + controller + "/list");
  } else {
    req.flash("error", "Invalid URL");
    return res.redirect(nodeAdminUrl + "/" + controller + "/list");
  }
}
exports.deleteRecord = deleteRecord;
