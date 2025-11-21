let nodemailer = require('nodemailer');
let config = require('../config/config');
// let connection = require('mysql').createPool(config.database);
let { firebaseadmin } = require('./firebaseconfig');

const UserDetail = require('../models/Users');

async function getUserToken (dealId,rmId=null) {
    console.log("Dealer Token", dealId)
	return new Promise(async(resolve) => {
		/*connection.getConnection((error,tempConnection)=>{
			if(error){
				resolve(false)
			} else {*/
                let tokens = []
                const rows = await UserDetail.findOne({
                    _id: dealId,
                    is_deleted: false
                }).lean();
				if(rows.length) {
                    tokens = rows.map(token=>token.token)
                }
                resolve(tokens)
            /*}
        })*/
    })
}


const getBearerToken = async () => {
    try {
        const token = await fb_admin.credential
          .cert(firebase_config)
          .getAccessToken();
        return token.access_token;
    } catch (error) {
        console.error("Error generating bearer token:", error);
    }
}

/*module.exports.pushNotification = async function (data, tempConnection){
    let auth_key = await getBearerToken();
    try {
        if (typeof data.to != "undefined" && data.to != null && data.to != "")
        {
            data.to.forEach(token => {
                const message = {
                    message: {
                        token: token,
                        data: {
                            title: util.format(`${(notificationContent.find(e => e.notification_type_id == data.type)).title}`,`${data.key}`),
                            body: util.format(`${(notificationContent.find(e => e.notification_type_id == data.type)).content}`,`${data.sentToName}`),
                        }
                    }
                };
                
                request.post({
                    json:true,
                    headers:{'content-type':'application/json','Authorization':'Bearer ' + auth_key},
                    url:'https://fcm.googleapis.com/v1/projects/livsol360/messages:send',
                    body:message
                },(err, result, push_body)=>{
                    if (!err){
                        console.log(push_body)
                        if(typeof push_body.name != "undefined" && push_body.name != "") {
                            connection.getConnection((error, tempConnection)=>{
                                if(error){
                                    console.log("error : ",error.message);
                                } else {
                                    mQuery = mysql.format("INSERT INTO `push_notification_log`( `notification_type_id`, `sent_to_type`, `sent_to`,`created_on`) VALUES (?,?,?,UNIX_TIMESTAMP()*1000);",[data.type,data.sentToType,data.sentToId])
                                    tempConnection.query(mQuery,(err, notification, fields) =>{
                                        tempConnection.release();
                                        if (!err){
                                            console.log('successfully logged');             
                                        }
                                    });
                                }
                            })  
                        } 
                    }     
                })
            })
        }
    } catch (err) {
        console.error('Error sending push notification:', err);
    }
}*/

async function pushNotification(message, title, token) {
    if(message && title && token) {
        token.forEach(registrationToken => {
            if (registrationToken != '' && title != '' && message != '')
            {
                const message_notification = {
                    token: registrationToken,
                    data: {
                        title: title,
                        body: message
                    },
                    android: {
                        priority: "high",
                        ttl: 172800
                    },
                    apns: {
                        headers: {
                            "apns-priority" : "5",
                            "apns-expiration" : "172800"
                        }
                    }, 
                };
                console.log("firebase payload  : ", message_notification)
                // Send the push notification
                firebaseadmin.messaging().send(message_notification).then(response => {
                    if(response) {
                        console.log({success: true, msg: "PN sent successfully", response: response})
                    } else {
                        console.log({success: false, msg: "PN not sent due to firebase response.", response: response})
                    }
                    return true;
                }).catch(error => {
                    console.log({ success: false, msg: "There are some problem while sending PN"})
                    console.log("PN Error : ", error);
                    return false;
                })
            } else {
                console.log({success: false, msg: "PN not sent as required parameters are empty."})
            }
        })
    } else {
        return false
    }
}

let smtpMail = nodemailer.createTransport({
    host: config.mailHost,
    port: config.mailPort,
    auth: {
       user: config.mailUser,
       pass: config.mailPass,
    }
});
var emailContent;
module.exports.sendEmail = function(data) {
	if(Array.isArray(data.to)) {
        if(data.to[0].email) {
            var emailTo = data.to[0].email;
        } else {
            var emailTo = data.to;
        }
		
	} else {
		var emailTo = data.to;
	}

    
    if(typeof data.phone != "undefined") {
        data.subject = `${data.subject}-${data.phone}`
    }

    if(typeof data.attachments == 'undefined') {
        data.attachments = null;
    }
    if(data.ccEmails && typeof data.ccEmails != 'undefined') {

        emailContent = {
            from: config.mailFrom, // Sender address
            to: emailTo,
            cc: Array.from(new Set(data.ccEmails)),  
            //bcc: data.bccEmails, // List of recipients// List of recipients
            subject: data.subject, // Subject line
            html: data.content, // Plain text body
            attachments : data.attachments
        };
    } else if(data.bccEmails && typeof data.bccEmails != 'undefined') {

        emailContent = {
            from: config.mailFrom, // Sender address
            to: emailTo,
            bcc: data.bccEmails, // List of recipients// List of recipients
            subject: data.subject, // Subject line
            html: data.content, // Plain text body
            attachments : data.attachments
        };
    } else {
        emailContent = {
            from: config.mailFrom, // Sender address
            to: emailTo,
            bcc: ['test@yopmail.com'],  
            subject: data.subject, // Subject line
            html: data.content, // Plain text body
            attachments : data.attachments
            //attachments : data.attachments
        };
    }

    //console.log(emailContent);
    //return;
    new Promise((resolve) => {
        resolve(true);
        /*connection.getConnection(function(error, tempConnection){
            if(error){
                console.log("error : ",error.message);
                resolve(true);
            } else {
                tempConnection.query("SELECT email from app_config WHERE id= 1;", function (error, results, fields){
                    if(error) {
                        resolve(true)
                    } else {
                        if(results.length) {
                            let flagVal = (results[0].email == "0") ? false : true
                            resolve(flagVal)
                        }
                        resolve(true);
                        return
                    }
                })
            }
        })*/
    }).then((flag) => {
        emailContent.to = (flag) ? emailContent.to : ['testing@gmail.com'];
        if(!flag) emailContent.cc = 'testing@gmail.com';   
        smtpMail.sendMail(emailContent, function(err, response) {
            if (err) {
                  console.log('error ',JSON.stringify(err));
                    console.log('Problem in sending the mail ', response);
            } else {
                let sysDate = new Date().getTime();
                     
                var title = "New Notification";
                var message = "Email Reminder Notification";
                var priority = "High";
                if(data.code == "new-lead"){
                    title = "New Homeowner Lead Assigned";
                    message = "You got a new homeowner lead, Please have a look and take the necessary actions";
                    priority = "High";
                } 

                /*tempConnection.query("INSERT INTO `notification_history`(`title`,`homeowner_mobile`,`message`,`sent_to`, `priority`) VALUES (?,?,?,?,?);",[`${title}`,data.phone,`${message}`,data.sentToId, `${priority}`], function (error, results, fields) {
                tempConnection.release();
                    if (error){
                            console.log(error);
                    }
                    
                });*/
                
                let rm_Id = !data.rmId ? data.rmId : 0;
                getUserToken(data.sentToId,rm_Id).then((tokens) => {
                    if(tokens) {
                        // pushNotification(message, title, tokens)
                    }
                })

                //unlink if path exist
                if(data.unlinkPath !== undefined && data.unlinkPath != 'undefined') {
                    let fs = require('fs');
                    fs.unlinkSync(data.unlinkPath);
                }
            }
            return response;
        });
    })   	
};
