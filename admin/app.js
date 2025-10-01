var express = require('express');
global.app = express(); 
global.moment = require('moment');
const expressValidator = require('express-validator');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');   
   
const swaggerHost = require('./config/config').swaggerHost;
const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Study',
            version: '1.0.0',
        },
        host: swaggerHost ,
        basePath: '/api',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http','https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'x-access-token',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    //files: ['./routes/**/*.js'] //Path to the API handle folder
    files: ['./routes/api.js'] //Path to the API handle folder
};
expressSwagger(options);

// Required module 
app.use(expressValidator());
app.use(cors()); 
app.use(fileUpload()); 

global.connectPool = require('./config/db.js');    
  
// Constants 
global.nodeSiteUrl = 'http://apply4study.com'; // node  
global.nodeAdminUrl = 'http://apply4study.com/admin'; // node  
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
app.use('/api',apiRouter);

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var courseRouter = require('./routes/course');
var surveyRouter = require('./routes/survey');

var menuRouter = require('./routes/menu');
var pageRouter = require('./routes/pages');
var blogRouter = require('./routes/blogs');
app.use('/admin',adminRouter,usersRouter,blogRouter,menuRouter,pageRouter,surveyRouter,categoryRouter,courseRouter);

var server = app.listen(8083, function () { 
    console.log("Example app listening at http://localhost:%s", server.address().port);
});       
process.on('uncaughtException', function (err) { 
    console.log('Caught exception: ' + err);
});  
 

