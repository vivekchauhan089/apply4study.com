let router = require('express').Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));
let jwt  = require('jsonwebtoken');
let secretKey = require('../config/config').secretKey;
let token;
//middleware to verify the
router.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    let checkLsqUrl = req.originalUrl.split("?");
    if(checkLsqUrl[0] == '/api/login') {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc'
    } else {
        token = req.headers['x-access-token'];
    }

    // decode token
    if (token) {

        /*const user = {user_id:1234,user_type_id:0,role:'guest'};
        const token = jwt.sign(user, secretKey, {expiresIn: '60d'});
        console.log('test token',token);*/

        // verifies secret and checks exp
        jwt.verify(token, secretKey, function(err, decoded) {      
            if (err) {
                return res.json({ error:1 ,succes: false, message: 'Failed to authenticate token.' });    
            } else {
                // if everything is good, save to request for use in other routes
                console.log(decoded);
                req.decoded = decoded;    
                next();
            }
        });
     } else {
        // if there is no token
        // return an error
        return res.status(403).send({ success: 0,message: 'No token provided.'});
    }
});

module.exports = router;
