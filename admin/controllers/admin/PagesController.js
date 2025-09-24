var Pages = require.main.require('./models/Pages');

const controller = 'Pages';
const module_name = 'Pages';

/**
 * List all Pages
 */
async function list(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'list';
    const allPages = await Pages.find({});
    res.render('admin/Pages/list', {
        page_title: "Page List",
        data: allPages,
        controller,
        module_name,
        action
    });
}
exports.list = list;

/**
 * Add Page
 */
async function add(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    let errorData = {};
    let data = {};
    let action = 'add';
    let page_title = 'Add Page';

    if (req.method === "POST") {
        let input = JSON.parse(JSON.stringify(req.body));

        req.checkBody("title", "Title is required").notEmpty();
        req.checkBody("slug", "Slug is required").notEmpty();

        const errors = req.validationErrors();
        if (errors) {
            errors.forEach(err => {
                errorData[err.param] = err.msg;
            });
            data = input;
        } else {
            // Upload Image
            if (req.files && req.files.image) {
                let PageImage = req.files.image;
                let filename = Date.now() + "-" + PageImage.name;
                input.image = filename;
                PageImage.mv("public/upload/" + filename, err => {
                    if (err) console.log("Image upload error", err);
                });
            }

            if (input.blocks && input.blocks != "") {
                input.blocks = JSON.parse(input.blocks);
            } else {
                input.blocks = [];
            }

            const SaveData = new Pages(input);
            const saveResult = await SaveData.save();
            if (saveResult) {
                req.flash("success", controller + " added successfully.");
                return res.redirect(nodeAdminUrl + "/" + controller + "/list");
            } else {
                req.flash("error", "Could not save Page. Try again!");
            }
        }
    }

    res.render('admin/'+controller+'/add',{page_title:page_title,data:data, errorData:errorData,controller:controller,action:action});
}
exports.add = add;

/**
 * Edit Page
 */
async function edit(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    let errorData = {};
    let action = 'edit';

    if (req.params.id) {
        let Page = await Pages.findById(req.params.id);
        if (!Page) {
            req.flash("error", "Invalid Page ID");
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
                  let PageImage = req.files.image;
                  let filename = Date.now() + "-" + PageImage.name;
                  input.image = filename;
                  PageImage.mv("public/upload/" + filename, err => {
                    if (err) console.log("Image upload error", err);
                  });
                }

                if (input.blocks && input.blocks != "") {
                    input.blocks = JSON.parse(input.blocks);
                } else {
                    input.blocks = [];
                }
                
                await Pages.findByIdAndUpdate(req.params.id, { $set: input });
                req.flash("success", "Page updated successfully.");
                return res.redirect(nodeAdminUrl + "/" + controller + "/list");
            }
        }

        res.render('admin/Pages/edit', {
            page_title: "Edit Page",
            data: Page,
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
 * Delete Page
 */
async function deleteRecord(req, res) {
  if (req.params.id) {
    await Pages.findByIdAndRemove(req.params.id);
    req.flash("success", "Page deleted successfully.");
    return res.redirect(nodeAdminUrl + "/" + controller + "/list");
  } else {
    req.flash("error", "Invalid URL");
    return res.redirect(nodeAdminUrl + "/" + controller + "/list");
  }
}
exports.deleteRecord = deleteRecord;
