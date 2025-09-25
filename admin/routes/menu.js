const express = require("express");
const router = express.Router();
const MenuController = require("../controllers/admin/MenuController");

router.get("/Menu/list", requiredAuthentication, MenuController.list);
router.get("/Menu/add", requiredAuthentication, MenuController.add);
router.post("/Menu/add", requiredAuthentication, MenuController.add);
router.get("/Menu/edit/:id", requiredAuthentication, MenuController.edit);
router.post("/Menu/edit/:id", requiredAuthentication, MenuController.edit);
router.get("/Menu/delete/:id", requiredAuthentication, MenuController.deleteRecord);

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
