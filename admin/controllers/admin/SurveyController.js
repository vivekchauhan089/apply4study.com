var Survey = require.main.require('./models/Survey');

const controller = 'Survey';
const module_name = 'Survey';

/**
 * List all Survey
 */
async function list(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'list';
    const allSurvey = await Survey.find({});
    res.render('admin/Survey/list', {
        Survey_title: "Survey List",
        data: allSurvey,
        controller,
        module_name,
        action
    });
}
exports.list = list;

/**
 * Add Survey
 */
async function add(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    let errorData = {};
    let data = {};
    let action = 'add';
    let Survey_title = 'Add Survey';

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
                let SurveyImage = req.files.image;
                let filename = Date.now() + "-" + SurveyImage.name;
                input.image = filename;
                SurveyImage.mv("public/upload/" + filename, err => {
                    if (err) console.log("Image upload error", err);
                });
            }

            if (input.blocks && input.blocks != "") {
                input.blocks = JSON.parse(input.blocks);
            } else {
                input.blocks = [];
            }

            const SaveData = new Survey(input);
            const saveResult = await SaveData.save();
            if (saveResult) {
                req.flash("success", controller + " added successfully.");
                return res.redirect(nodeAdminUrl + "/" + controller + "/list");
            } else {
                req.flash("error", "Could not save Survey. Try again!");
            }
        }
    }

    res.render('admin/'+controller+'/add',{Survey_title:Survey_title,data:data, errorData:errorData,controller:controller,action:action});
}
exports.add = add;

/**
 * Edit Survey
 */
async function edit(req, res) {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    let errorData = {};
    let action = 'edit';

    if (req.params.id) {
        let Survey = await Survey.findById(req.params.id);
        if (!Survey) {
            req.flash("error", "Invalid Survey ID");
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
                  let SurveyImage = req.files.image;
                  let filename = Date.now() + "-" + SurveyImage.name;
                  input.image = filename;
                  SurveyImage.mv("public/upload/" + filename, err => {
                    if (err) console.log("Image upload error", err);
                  });
                }

                if (input.blocks && input.blocks != "") {
                    input.blocks = JSON.parse(input.blocks);
                } else {
                    input.blocks = [];
                }
                
                await Survey.findByIdAndUpdate(req.params.id, { $set: input });
                req.flash("success", "Survey updated successfully.");
                return res.redirect(nodeAdminUrl + "/" + controller + "/list");
            }
        }

        res.render('admin/Survey/edit', {
            Survey_title: "Edit Survey",
            data: Survey,
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
 * Delete Survey
 */
async function deleteRecord(req, res) {
  if (req.params.id) {
    await Survey.findByIdAndRemove(req.params.id);
    req.flash("success", "Survey deleted successfully.");
    return res.redirect(nodeAdminUrl + "/" + controller + "/list");
  } else {
    req.flash("error", "Invalid URL");
    return res.redirect(nodeAdminUrl + "/" + controller + "/list");
  }
}
exports.deleteRecord = deleteRecord;
