var express = require('express');
global.app = express(); 
global.moment = require('moment');
const expressValidator = require('express-validator');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');   
   
// Required module 
app.use(expressValidator());
app.use(cors()); 
app.use(fileUpload()); 

global.connectPool = require('./config/db.js');    
  
// Constants 
global.nodeSiteUrl = 'http://localhost:8083'; // node  
global.nodeAdminUrl = 'http://localhost:8083/admin'; // node  
global.siteTitle = 'Apply4study Admin';
global.successStatus = 200;
global.failStatus = 401; 
global.SessionExpireStatus = 500;  
global.CURRENCY = '$';   
 

/* Admin section code */
app.set('view engine', 'ejs');
//app.set('view engine', 'pug') 
var path = require('path');
app.set('views', path.join(__dirname, 'views'));  
app.use(express.static(__dirname +'/public'));  
var flash = require('express-flash-messages')
app.use(flash())
 
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
app.use(cookieParser()); 
app.use(expressSession({secret: 'D%$*&^lk32', resave: false,saveUninitialized: true}));  

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});   
app.use(bodyParser.json());  
app.use(express.urlencoded({limit: '100mb',extended: true })); 
  
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

var apiRouter = require('./routes/api');
var blogRouter = require('./routes/blogs');
var pageRouter = require('./routes/pages');

app.use('/',apiRouter,blogRouter,pageRouter);

var server = app.listen(8083, function () { 
    console.log("Example app listening at http://localhost:%s", server.address().port);
});       
process.on('uncaughtException', function (err) { 
    console.log('Caught exception: ' + err);
});  
 

