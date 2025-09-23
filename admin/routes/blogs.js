const express = require("express");
const router = express.Router();
const BlogsController = require("../controllers/admin/BlogsController");

router.get("/admin/Blogs/list", requiredAuthentication, BlogsController.list);
router.get("/admin/Blogs/add", requiredAuthentication, BlogsController.add);
router.post("/admin/Blogs/add", requiredAuthentication, BlogsController.add);
router.get("/admin/Blogs/edit/:id", requiredAuthentication, BlogsController.edit);
router.post("/admin/Blogs/edit/:id", requiredAuthentication, BlogsController.edit);
router.get("/admin/Blogs/delete/:id", requiredAuthentication, BlogsController.deleteRecord);

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
