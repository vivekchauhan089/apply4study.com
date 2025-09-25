const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/admin/CategoryController");

router.get("/Category/list", requiredAuthentication, CategoryController.list);
router.get("/Category/add", requiredAuthentication, CategoryController.add);
router.post("/Category/add", requiredAuthentication, CategoryController.add);
router.get("/Category/edit/:id", requiredAuthentication, CategoryController.edit);
router.post("/Category/edit/:id", requiredAuthentication, CategoryController.edit);
router.get("/Category/delete/:id", requiredAuthentication, CategoryController.deleteRecord);

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
