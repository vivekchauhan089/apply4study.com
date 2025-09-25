var express = require('express');
var router = express.Router(); 
var UsersController    =  require('../controllers/admin/UsersController');   

/** Routes for users module  */ 
router.get('/Users/list',requiredAuthentication,  UsersController.list);     
router.get('/Users/edit/:id', requiredAuthentication, UsersController.edit);     
router.post('/Users/edit/:id',requiredAuthentication,  UsersController.edit); 
router.post('/Users/add',requiredAuthentication, UsersController.add); 
router.get('/Users/add', requiredAuthentication, UsersController.add); 
router.get('/Users/delete/:id', requiredAuthentication, UsersController.deleteRecord);


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