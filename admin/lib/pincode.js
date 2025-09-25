let router = require('express').Router();
let config = require('../config');
let request = require('request');


router.get('/pincode/:pincode',(req,res,next)=>{
    request({
        url : `https://pincode.saratchandra.in/api/pincode/${req.params.pincode}`,
        method : 'get',
        timeout : 2000,
        headers : {'content-type': 'application/json'},
        json : true
    },(err,response,body)=>{
        if(!err){
            if(body.status == "200"){
                let data = {
                    state_name : body.data[0].state_name,
                    district : body.data[0].district
                }
                res.status(200).json({success: 1, data:data , message: 'Verified'});
            } else {
                res.status(204).json({error: 1, message: `Pincode doesn't exist.`});  
            }
        } else {
            res.status(200).json({error: 1, message: 'Error in process,retry'});
        }
    })
    
});

module.exports = router;