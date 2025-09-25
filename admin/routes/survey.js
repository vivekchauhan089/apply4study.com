const express = require("express");
const router = express.Router();
const SurveyController = require("../controllers/admin/SurveyController");

router.get("/Survey/list", requiredAuthentication, SurveyController.list);
router.get("/Survey/add", requiredAuthentication, SurveyController.add);
router.post("/Survey/add", requiredAuthentication, SurveyController.add);
router.get("/Survey/edit/:id", requiredAuthentication, SurveyController.edit);
router.post("/Survey/edit/:id", requiredAuthentication, SurveyController.edit);
router.get("/Survey/delete/:id", requiredAuthentication, SurveyController.deleteRecord);

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
