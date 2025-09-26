const express = require("express");
const router = express.Router();
const courseController = require("../controllers/admin/CourseController");

router.get("/Course/list", requiredAuthentication, courseController.list);

router.get("/Course/add", requiredAuthentication, courseController.add);
router.post("/Course/add", requiredAuthentication, courseController.add);

router.get("/Course/edit/:id", requiredAuthentication, courseController.edit);
router.post("/Course/edit/:id", requiredAuthentication, courseController.edit);

router.post("/Course/qr/:id", requiredAuthentication, courseController.generateQr);

router.get("/Course/delete/:id", requiredAuthentication, courseController.deleteRecord);

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
