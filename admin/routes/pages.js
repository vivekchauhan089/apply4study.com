const express = require("express");
const router = express.Router();
const PagesController = require("../controllers/admin/PagesController");

router.get("/admin/Pages/list", requiredAuthentication, PagesController.list);
router.get("/admin/Pages/add", requiredAuthentication, PagesController.add);
router.post("/admin/Pages/add", requiredAuthentication, PagesController.add);
router.get("/admin/Pages/edit/:id", requiredAuthentication, PagesController.edit);
router.post("/admin/Pages/edit/:id", requiredAuthentication, PagesController.edit);
router.get("/admin/Pages/delete/:id", requiredAuthentication, PagesController.deleteRecord);

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
