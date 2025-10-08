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
            swaggerHost:'apply4study.com',
            adminUrl: 'https://apply4study.com/admin',
            mailFrom:'',
            mailPort:587,
            mailHost:'smtp.office365.com',
            mailUser:'',
            mailPass:'',
            ccEmails:[],
            secretKey:'@studyLatt1cek1', // use your own secret key
            baseUrl:'https://apply4study.com',
            siteUrl:'https://apply4study.com',
            sendgridKey:'', //sendgrid key
            firebaseKey:'',// kirebase key from google
            version_name : "v1.1", // current app version
            version_code : "12",
            // phoneID: '',
            // METATK: '',
            GROQ_API_KEY: '',
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
