const express = require("express");
const router = express.Router();
const BlogsController = require("../controllers/admin/BlogsController");

router.get("/Blogs/list", requiredAuthentication, BlogsController.list);
router.get("/Blogs/add", requiredAuthentication, BlogsController.add);
router.post("/Blogs/add", requiredAuthentication, BlogsController.add);
router.get("/Blogs/edit/:id", requiredAuthentication, BlogsController.edit);
router.post("/Blogs/edit/:id", requiredAuthentication, BlogsController.edit);
router.get("/Blogs/delete/:id", requiredAuthentication, BlogsController.deleteRecord);

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
