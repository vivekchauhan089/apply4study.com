var Menu = require.main.require('./models/Menu');
var Users = require.main.require('./models/Users');
var Roles = require.main.require('./models/Roles');

const controller = 'Menu';
const module_name = 'Menu';

/**
 * List all Menu
 */
async function list(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'list';
    const allMenu = await Menu.find({}).populate('author_id');
    res.render('admin/Menu/list', {
        page_title: "Menu List",
        data: allMenu,
        controller,
        module_name,
        action
    });
}
exports.list = list;

/**
 * Add Menu
 */
async function add(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    let errorData = {};
    let data = {};
    let action = 'add';
    let page_title = 'Add Menu';

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
                let MenuImage = req.files.image;
                let filename = Date.now() + "-" + MenuImage.name;
                input.image = filename;
                MenuImage.mv("public/upload/" + filename, err => {
                    if (err) console.log("Image upload error", err);
                });
            }

            const SaveData = new Menu(input);
            const saveResult = await SaveData.save();
            if (saveResult) {
                req.flash("success", controller + " added successfully.");
                return res.redirect(nodeAdminUrl + "/" + controller + "/list");
            } else {
                req.flash("error", "Could not save Menu. Try again!");
            }
        }
    }

    res.render('admin/'+controller+'/add',{page_title:page_title,data:data, authors: authors, errorData:errorData,controller:controller,action:action});
}
exports.add = add;

/**
 * Edit Menu
 */
async function edit(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    let errorData = {};
    let action = 'edit';

    if (req.params.id) {
        let Menu = await Menu.findById(req.params.id);
        var authorRole = await Roles.findOne({ name: 'author' });
        var authors = await Users.find({ role_id: authorRole._id }); 
        if (!Menu) {
            req.flash("error", "Invalid Menu ID");
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
                  let MenuImage = req.files.image;
                  let filename = Date.now() + "-" + MenuImage.name;
                  input.image = filename;
                  MenuImage.mv("public/upload/" + filename, err => {
                    if (err) console.log("Image upload error", err);
                  });
                }
                await Menu.findByIdAndUpdate(req.params.id, { $set: input });
                req.flash("success", "Menu updated successfully.");
                return res.redirect(nodeAdminUrl + "/" + controller + "/list");
            }
        }

        res.render('admin/Menu/edit', {
            page_title: "Edit Menu",
            data: Menu,
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
 * Delete Menu
 */
async function deleteRecord(req, res) {
  if (req.params.id) {
    await Menu.findByIdAndRemove(req.params.id);
    req.flash("success", "Menu deleted successfully.");
    return res.redirect(nodeAdminUrl + "/" + controller + "/list");
  } else {
    req.flash("error", "Invalid URL");
    return res.redirect(nodeAdminUrl + "/" + controller + "/list");
  }
}
exports.deleteRecord = deleteRecord;
