let config = function(){
    switch(process.env.NODE_ENV){
    	// use for production environment
        case 'prod' : return {
                        
        };
        // use for local environment
        case 'local' : return {
            database:{
                host     : 'localhost',
                user     : 'root',
                password : '',
                database : 'test',
                connectionLimit: 100,
                multipleStatements: true,
                acquireTimeout: 10000 // optional
            },
            port : '8083',
            timeout: 10000,
            swaggerHost:'localhost:8083',
            adminUrl: 'http://localhost:8083/admin',
            mailFrom:'',
            mailPort:587,
            mailHost:'smtp.office365.com',
            mailUser:'',
            mailPass:'',
            ccEmails:[],
            secretKey:'@studyLatt1cek1', // use your own secret key
            baseUrl:'http://localhost:8083',
            siteUrl:'http://localhost:3000',
            sendgridKey:'', //sendgrid key
            firebaseKey:'',// kirebase key from google
            version_name : "v1.1", // current app version
            version_code : "12",
            // phoneID: '',
            // METATK: '',
            pagelimit: 10
        };
        // use for development environment
        case 'dev' : return {

        };
        // use testing environment
        case 'test' : return {

        };
    }
};
module.exports = new config();
