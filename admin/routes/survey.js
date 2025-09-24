const express = require("express");
const router = express.Router();
const SurveyController = require("../controllers/admin/SurveyController");

router.get("/admin/Survey/list", requiredAuthentication, SurveyController.list);
router.get("/admin/Survey/add", requiredAuthentication, SurveyController.add);
router.post("/admin/Survey/add", requiredAuthentication, SurveyController.add);
router.get("/admin/Survey/edit/:id", requiredAuthentication, SurveyController.edit);
router.post("/admin/Survey/edit/:id", requiredAuthentication, SurveyController.edit);
router.get("/admin/Survey/delete/:id", requiredAuthentication, SurveyController.deleteRecord);

module.exports = router;

function requiredAuthentication(req, res, next) { 
    if(req.session){
        LoginUser = req.session.LoginUser; 
        if(LoginUser){    
            next();   
        }else{
            res.redirect(nodeAdminUrl+'/login');       
        } 
    }else{
        res.redirect(nodeAdminUrl+'/login');       
    }
}
