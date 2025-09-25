var express = require('express');
var router = express.Router(); 
var AdminController =  require('../controllers/admin/AdminController');   

/** Routes for admin  */     
//router.get('/login', AdminController.login);     
router.post('/login', AdminController.login);     
router.get('/login', AdminController.login);     
router.get('/Dashboard', requiredAuthentication, AdminController.dashboard);  
router.get('/logout', AdminController.logout);         

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