const express = require("express");
const router = express.Router();
const PagesController = require("../controllers/admin/PagesController");

router.get("/Pages/list", requiredAuthentication, PagesController.list);
router.get("/Pages/add", requiredAuthentication, PagesController.add);
router.post("/Pages/add", requiredAuthentication, PagesController.add);
router.get("/Pages/edit/:id", requiredAuthentication, PagesController.edit);
router.post("/Pages/edit/:id", requiredAuthentication, PagesController.edit);
router.get("/Pages/delete/:id", requiredAuthentication, PagesController.deleteRecord);

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
