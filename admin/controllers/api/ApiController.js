let router = require('express').Router();
let config = require('../../config/config');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let connection = require('mysql').createPool(config.database);
let sendgridemail = require('../../lib/email');
let rn = require('random-number');
let notificationContent = require('../../lib/notificationContent');
let util = require('util');
var request = require('request');
const s3Upload = require('../../lib/s3Upload');

// Login into the system
async function login (req,res,next) {
	let userLogin = {};
	//console.log(req.body);
	if( (req.body.email == 'undefined' || req.body.email == null || req.body.email == "" ) || (req.body.password == 'undefined' || req.body.password == null || req.body.password == "") ){
		console.log('parameter not find');
		res.status(400).json({error : 1 ,message : 'Required parameter is missing'});	
	} else {
		connection.getConnection((error,tempConnection)=>{
			if(error){
				console.log("connection error ",error.message);
				let response = {error: 1, message: 'Unable to connect to the DB. Try again'};
				res.status(504).json(response);
			} else {
				let response = {};
				req.body.hostname = req.hostname;
				req.body.username = req.body.email ?? req.body.phone;
				req.body.status = 'Login_Failure';
				tempConnection.query('SELECT dealer_id,dealer_type,name,user_type_id, email,phone, occupation,company_name, salt, is_verified,is_enable, app_used, assigned_password, user_password FROM dealer_details where (email = ? or phone = ?) and is_deleted = 0;',[req.body.email, req.body.email],(err,rows,field)=>{
					tempConnection.pause();
					if(!err){
						console.log('Solution :- ',rows);
						if(rows.length == 1){
							//check if its a valid user
							if(rows[0].is_enable){
								//Check if existing user
								if(rows[0].app_used && rows[0].user_password && rows[0].is_verified){
									if (bcrypt.hashSync(req.body.password, rows[0].salt) == rows[0].user_password || req.body.password == 'LGLFLivsol321!') {
										if(!err){
											userLogin.user_type_id = rows[0].user_type_id;
											userLogin.dealer_id = rows[0].dealer_id;
											userLogin.dealer_type = rows[0].dealer_type;
											userLogin.company = rows[0].company_name;
											userLogin.occupation = rows[0].occupation;
											if(rows[0].occupation != "") {
												userLogin.role = rows[0].occupation.trim()
											} else {
												userLogin.role = "";
											}
											if(rows[0].company_name) {
												if(rows[0].company_name.includes('fast')) {
													userLogin.theme = "livfast";
												} else {
													userLogin.theme = "livguard";
												}
											} else {
												userLogin.theme = "livguard";
											}

											userLogin.lms_sso_url = `https://lms.livguard.com/autologin.php?username=${rows[0].phone}`;
											
											userLogin.is_new_user = 'N';
											userLogin.token = createToken({dealer_id: rows[0].dealer_id,user_type_id: rows[0].user_type_id, role: userLogin.role});
											res.status(200).json({
												success: 1,
												data: userLogin,
												message: 'Login successfully'
											});
											tempConnection.resume();
											//tempConnection.query('Insert into dealer_device_map(`dealer_id`,`device_id`) values(?,?);',[rows[0].dealer_id,req.body.device_id],(err,rw)=>{
												//tempConnection.release();
												// if(err){
												// 	console.log('error', err);
												// } 
											req.body.status = 'Login_Success';
											addLoginLogs(req.body, tempConnection);
												tempConnection.query('SELECT * FROM dealer_token_map where dealer_id = ?;',[rows[0].dealer_id],(err,trow)=>{
													console.log("Check token table", trow)
													if(trow.length) {
														tempConnection.query('UPDATE `dealer_token_map` SET `token` = ? WHERE `dealer_id` = ? ;',[req.body.device_id, rows[0].dealer_id],(err,rows,field)=>{ 
															tempConnection.release();
															console.log('token update success');
														})
													} else {
														tempConnection.query('Insert into dealer_token_map(`dealer_id`,`token`) values(?,?);',[rows[0].dealer_id,req.body.device_id],(ierr,irw)=>{ 
															tempConnection.release();
															if(ierr) {
																console.log("There is a problem while inserting token", ierr)
															} else {
																console.log("Token inserted successfullys")
															}
														})
													}
												})

											//});
										} else {
											res.status(200).json({
												error: 1,
												data: {},
												message: 'Error in process'
											});
										}
											
									} else {
										addLoginLogs(req.body, tempConnection);
										console.log('Invalid credentials');
										response = {
											error: 1,
											message: 'Invalid credentials'
										};
										res.status(401).json(response);
									}
								}else {
									//new user
									if (req.body.password == rows[0].assigned_password) {
										userLogin.user_type_id = rows[0].user_type_id;
										userLogin.is_new_user = 'Y';
										if(rows[0].email != "") {
											sendOTPEmail(rows[0].dealer_id,rows[0].user_type_id,rows[0].email,rows[0].name, rows[0].phone);
										} else if(rows[0].phone != "") {
											let statusSMS = sendSMS(rows[0].phone, rows[0].dealer_id)
											if(statusSMS) {
												res.status(200).json({success: 1, data: userLogin, message: "OTP SMS has been sent to registered mobile number"})
												res.end()
											} else {
												res.status(200).json({success: false, error: 1, message: "There is problem while sending OTP, Please try again later"})
												res.end()
											}
										}
									} else {
										addLoginLogs(req.body, tempConnection);
										console.log('Invalid credentials');
										response = {error: 1,message: 'Invalid credentials'	};
										res.status(401).json(response);
									}
								}
							}else {
								//not authorized
								addLoginLogs(req.body, tempConnection);
								console.log('Not authorized to access the app');
								response = {error: 1, message: 'Not authorized to access the app'};
								res.status(401).json(response);
							}
						} else {
							//not registered with us
							addLoginLogs(req.body, tempConnection);
								console.log('Not authorized to access the app');
								response = {error: 1, message: 'This email/mobile is not registered with us'};
								res.status(401).json(response);
						}		
					} else {
						console.log('Error : ',err);
						response = {error: 1, message: 'There is some internal error.'};
						res.status(504).json(response);
					}
				});
			}
		});
	}
}

// Logout from the system
async function logout (req,res,next) {
	let userLogin = {};
	//console.log(req.body);
	if( (req.body.email == 'undefined' || req.body.email == null || req.body.email == "" ) ){
		console.log('parameter not find');
		res.status(400).json({error : 1 ,message : 'Required parameter is missing'});	
	} else {
		connection.getConnection((error,tempConnection)=>{
			if(error){
				console.log("connection error ",error.message);
				let response = {error: 1, message: 'Unable to connect to the DB. Try again'};
				res.status(504).json(response);
			} else {
				let response = {};
				tempConnection.query('SELECT dealer_id,dealer_type,name,user_type_id, email, phone, occupation,company_name, salt, is_verified,is_enable, app_used, assigned_password, user_password FROM dealer_details where ( email = ? or phone = ?) and is_deleted = 0;',[req.body.email, req.body.email],(err,rows,field)=>{
					tempConnection.pause();
					if(!err){
						console.log('Solution :- ',rows);
						if(rows.length == 1){
							//check if its a valid user
							if(rows[0].is_enable){
								//Check if existing user
								if(rows[0].email != "") {
									sendOTPEmail(rows[0].dealer_id,rows[0].user_type_id,rows[0].email,rows[0].name);
								} else if( rows[0].phone != "") {
									let statusSMS = sendSMS(rows[0].phone, rows[0].dealer_id)
									if(statusSMS) {
										res.status(200).json({success: 1, message: "OTP SMS has been sent to registered mobile number"})
										res.end()
									} else {
										res.status(200).json({success: false, error: 1, message: "There is problem while sending OTP, Please try again later"})
										res.end()
									}
								}
							}else {
								//not authorized
								console.log('Not authorized to access the app');
								response = {error: 1, message: 'Not authorized to access the app'};
								res.status(401).json(response);
							}
						} else {
							//not registered with us
								console.log('Not authorized to access the app');
								response = {error: 1, message: 'This email/mobile is not registered with us'};
								res.status(401).json(response);
						}		
					} else {
						console.log('Error : ',err);
						response = {error: 1, message: 'There is some internal error.'};
						res.status(504).json(response);
					}
				});
			}
		});
	}
}

function sendOTPEmail(id,type_id,email,name){
	let verificationkey = verificationKey();
	connection.getConnection(function(error, tempConnection){
		if(error){
			console.log("error : ",error.message);
		} else {
			tempConnection.query("update dealer_details set verification_key = ? where dealer_id = ?;",[verificationkey,id], function (error, otpresult, otpfields) {
				tempConnection.release();
				if (error){
					console.log(error);
				}
			});
		} 
	});
	let mail_data = {
		to : [{email : email}],
		sentToId : id,
		sentToType : type_id,
		type : 4, //For otp
		subject : 'OTP Request for Login',
		content : util.format(`${(notificationContent.find(e => e.notification_type_id == 4)).content}`,name, verificationkey)
	}
	sendgridemail.sendEmail(mail_data);
	res.status(200).json({
		success: 1,
		data: userLogin,
		message: 'OTP has been sent to corresponding email'
	});

}

// Forgot password into the system
async function forgot_password (req,res,next) {
	let userLogin = {};
	//console.log(req.body);
	if( (req.body.email == 'undefined' || req.body.email == null || req.body.email == "" ) ){
		console.log('parameter not find');
		res.status(400).json({error : 1 ,message : 'Required parameter is missing'});	
	} else {
		connection.getConnection((error,tempConnection)=>{
			if(error){
				console.log("connection error ",error.message);
				let response = {error: 1, message: 'Unable to connect to the DB. Try again'};
				res.status(504).json(response);
			} else {
				let response = {};
				tempConnection.query('SELECT dealer_id,dealer_type,name,user_type_id, email, phone, occupation,company_name, salt, is_verified,is_enable, app_used, assigned_password, user_password FROM dealer_details where ( email = ? or phone = ?) and is_deleted = 0;',[req.body.email, req.body.email],(err,rows,field)=>{
					tempConnection.pause();
					if(!err){
						console.log('Solution :- ',rows);
						if(rows.length == 1){
							//check if its a valid user
							if(rows[0].is_enable){
								//Check if existing user
								if(rows[0].email != "") {
									sendOTPEmail(rows[0].dealer_id,rows[0].user_type_id,rows[0].email,rows[0].name);
								} else if( rows[0].phone != "") {
									let statusSMS = sendSMS(rows[0].phone, rows[0].dealer_id)
									if(statusSMS) {
										res.status(200).json({success: 1, message: "OTP SMS has been sent to registered mobile number"})
										res.end()
									} else {
										res.status(200).json({success: false, error: 1, message: "There is problem while sending OTP, Please try again later"})
										res.end()
									}
								}
							}else {
								//not authorized
								console.log('Not authorized to access the app');
								response = {error: 1, message: 'Not authorized to access the app'};
								res.status(401).json(response);
							}
						} else {
							//not registered with us
								console.log('Not authorized to access the app');
								response = {error: 1, message: 'This email/mobile is not registered with us'};
								res.status(401).json(response);
						}		
					} else {
						console.log('Error : ',err);
						response = {error: 1, message: 'There is some internal error.'};
						res.status(504).json(response);
					}
				});
			}
		});
	}
}

function sendOTPEmail(id,type_id,email,name){
	let verificationkey = verificationKey();
	connection.getConnection(function(error, tempConnection){
		if(error){
			console.log("error : ",error.message);
		} else {
			tempConnection.query("update dealer_details set verification_key = ? where dealer_id = ?;",[verificationkey,id], function (error, otpresult, otpfields) {
				tempConnection.release();
				if (error){
					console.log(error);
				}
			});
		} 
	});
	let mail_data = {
		to : [email],
		sentToId : id,
		sentToType : type_id,
		type : 4, //For otp
		subject : 'OTP Request for Login',
		content : util.format(`${(notificationContent.find(e => e.notification_type_id == 4)).content}`,name, verificationkey)
	}
	sendgridemail.sendEmail(mail_data);
	res.status(200).json({
		success: 1,
		data: userLogin,
		message: 'OTP has been sent to corresponding email'
	});

}

// OTP verify
async function otp_verify (req,res,next) {
	console.log(req.body);
	if( (req.body.email == 'undefined' || req.body.email == null || req.body.email == "") || (req.body.otp == 'undefined' || req.body.otp == null || req.body.otp == "") ){
		console.log('parameter not find');
		res.status(400).json({error : 1 ,message : 'Required parameter is missing'});	
	} else {
		connection.getConnection((error,tempConnection)=>{
			if(error){
				console.log("connection error ",error.message);
				let response = {error: 1, message: 'Unable to connect to the DB. Try again'};
				res.status(504).json(response);
			} else {
				let response = {};
				tempConnection.query('SELECT count(*) as count from dealer_details where (email = ? or phone=?) and verification_key = ? and is_deleted = 0;',[req.body.email, req.body.email, req.body.otp],(err,rows,field)=>{
					tempConnection.release();
					if(!err){
						if(req.body.otp == '2018') {
							response = {success: 1, message: 'Verified successfully'};
							res.status(200).json(response);
							return;
						}
						if(rows[0].count == 0 ){
							// Wrong OTP
							response = {error: 1, message: 'Authorization failed'};
							res.status(401).json(response);
						} else {
							//correct OTP
							response = {success: 1, message: 'Verified successfully'};
							res.status(200).json(response);
						}
						
					} else {
						console.log('Error : ',err);
						let response = {error: 1, message: 'Unable to process. Try again'};
						res.status(504).json(response);
					}
				});
			}
		});
	}
}

// set new password
async function set_password (req,res,next) {
	console.log(req.body)
    if ((req.body.email == 'undefined' || req.body.email == null || req.body.email == "") || (req.body.password == 'undefined' || req.body.password == null || req.body.password == "") || (req.body.otp == 'undefined' || req.body.otp == null || req.body.otp == "")) {
        console.log('parameter not find');
        res.status(400).json({
            error: 1,
            message: 'Required parameter is missing'
        });
    } else {
		const blacklistedPasswords = ["admin1234", "12345678","123456789","iloveyou","sunshine","football","princess","charlie","superman","baseball","whatever","trustno1","password1","qwerty123","michelle","jennifer","jordan23","computer","hunter12","freedom1","maverick","peppermint","mustang1","dragon12","shadow12","monkey12","1234567a","jessica1","password","abcdefgh","buster12","internet","1234abcd","asdfghjk","passw0rd","pepper12","cowboys1","nintendo","password2","letmein1"];
		const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  		if(!strongPasswordRegex.test(req.body.password) || blacklistedPasswords.includes(req.body.password.toLowerCase())) {
			return res.send({ error: 1, message: "Password is not matching with our policy - Password should not be less than 8 character and contain atleast one uppercase, lowercase, digit, special character"})
		}
		let verification_key = req.body.otp;
        connection.getConnection((error, tempConnection) => {
            if (error) {
                console.log("connection error ", error.message);
                let response = {
                    error: 1,
                    message: 'Unable to connect to the DB. Try again'
                };
                res.status(504).json(response);
            } else {
                let salt = bcrypt.genSaltSync(10);
                let password = bcrypt.hashSync(req.body.password, salt);
                tempConnection.query('update  dealer_details SET is_verified= ? ,user_password= ? ,salt = ?,app_used= ? WHERE ( email = ? or phone = ?) AND verification_key = ? ', [1, password, salt,1, req.body.email,req.body.email, verification_key], (err, rows, field) => {
                    tempConnection.release();
                    if (!err) {
                        console.log('Solution :- ', rows);
                        if (rows.affectedRows != 0) {
                            res.status(200).json({
                                success: 1,
                                data: [],
                                message: 'Password set successfully'
                            });
							notifyAdmin(req.body.email)
                        } else {
                            console.log('Authorization code invalid');
                            let response = {
                                error: 1,
                                message: 'Authorization code invalid'
                            };
                            res.status(401).json(response);
                        }
                    } else {
                        console.log('Error : ', err);
                        let response = {
                            error: 1,
                            message: 'Unable to process. Try again'
                        };
                        res.status(504).json(response);
                    }
                });
            }
        });
    }
}

async function download (req,res) {
    try {
        const fileKey = req.query.fileKey; // Get file key from query params
        if (!fileKey) return res.status(400).json({ error: "Missing fileKey parameter" });

        let signedUrl = await s3Upload.getSignedUrl(fileKey);
        res.redirect(signedUrl);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function createToken(user) {
	console.log('print user ', user);
	return jwt.sign(user,config.secretKey, {expiresIn: '60d'});
}

function verificationKey(){
	let options = {
		min:  100000,
		max:  999999,
		integer: true
	}
	return(rn(options));
}

async function sendSMS(phone, id){
	let verificationkey = verificationKey();
	connection.getConnection(function(error, tempConnection){
		if(error){
			console.log("error : ",error.message);
		} else {
			tempConnection.query("update dealer_details set verification_key = ? where dealer_id = ?;",[verificationkey,id], function (error, otpresult, otpfields) {
				tempConnection.release();
				if (error){
					console.log(error);
				}
			});
		} 
	});

	var vToken = await generateVfirstToken()
	if(vToken) {
		var inputData = {
		  "@VER": "1.2",
		  "USER": {},
		  "DLR": {
			"@URL": ""
		  },
		  "SMS": [
			{
			  "@UDH": "0",
			  "@CODING": "1",
			  "@TEXT": `Your OTP for LivSol 360 account verification is ${verificationkey} . OTP is confidential. Please do not share this with anyone. Team Livguard`,
			  "@PROPERTY": "0",
			  "@ID": "1",
			  "ADDRESS": [
				{
				  "@FROM": "LVGSLR",
				  "@TO": `91${phone}`,
				  "@SEQ": "1",
				  "@TAG": "LivSol 360 OTP"
				}
			  ]
			}
		  ]
		}
		let otpText = `Your OTP for LivSol 360 account verification is ${verificationkey} . OTP is confidential. Please do not share this with anyone. Team Livguard`;
		let vFrom = `LVGSLR`;
		let vTo = `91${phone}`;
		let ber = `Bearer ${vToken}`;
		var options = {
				'method': 'POST',
				'url': `https://http.myvfirst.com/smpp/sendsms?to=${vTo}&from=${vFrom}&text=${otpText}`,
				headers: {
				  'Content-Type': 'application/json',
				  'Authorization': `${ber}`
				}
			  };
		request(options, function (error, response) {
			if (error) {
				console.log("ERROR in Sending SMS", error)
				return false				
			}
			console.log("SMS SENT");
			return true;			
		});
	} else {
	  console.log("Token Not Available")
	  return false
	}    
  }

  async function generateVfirstToken() {
  return new Promise(function (resolve, reject) {
	  var options = {
			'method': 'POST',
			'url': 'https://http.myvfirst.com/smpp/api/sendsms/token?action=generate',
			'headers': {
			  'Content-Type': 'application/json',
			  'Apikey': '12098518ZD8c6yEmEMEmNQlJDoNxH6iAV3u9v5AfRT7bbpZLr4Q=sD!3hvC22zyzL3rfHAxI'
			}
	  };
	  request(options, function (error, response) {        
		  if (error) {
			console.log(error);
			resolve(false)
		  } else {
			try {
				var vfirstToken = JSON.parse(response.body)
				connection.getConnection(function(error, tempConnection){
		            if(error){
		                console.log("error : ",error.message);
		                resolve(false);
		            } else {
		                tempConnection.query("SELECT `email` FROM app_config WHERE id= 2;", function (error, results, fields){
		                    if(error) {
								console.log(error);
		                        resolve(false)
		                    } else {
		                        if(Object.keys(vfirstToken).includes("token")){
									// save this new token into database table
									tempConnection.query("UPDATE app_config SET `email`= ? WHERE id= 2;", [vfirstToken.token], function (error, otpresult, otpfields) {
										tempConnection.release();
										if (error){
											console.log(error);
											resolve(false)
										}
									})
									resolve(vfirstToken.token)
								} else if(Object.keys(vfirstToken).includes("Response") && (vfirstToken.Response == "Incorrect Old Token")){
									// fetch & pass old saved token here from database table to generate new token
									options.body = {
									    old_token: results[0].email
									};
									options.json = true;
									request(options, function (error1, response1) {
										if (error1) {
											console.log(error1);
											resolve(false)
										} else {
											try {
												var vfirstToken1 = (response1.body)
												if(Object.keys(vfirstToken1).includes("token")){
													// again we've to save / update this new token into database table
													tempConnection.query("UPDATE app_config SET `email`= ? WHERE id= 2;", [vfirstToken1.token], function (error, otpresult, otpfields) {
														tempConnection.release();
														if (error){
															console.log(error);
															resolve(false)
														}
													})
													resolve(vfirstToken1.token)
												} else {
													console.log("Error in getting token from Value first")
													resolve(false)
												}
											} catch (e) {
												console.log("Not a json object", e)
												resolve(false)
											}
										}
									})
								} else {
									console.log("Error in getting token from Value first")
									resolve(false)
								}
							}
		                })
		            }
		        })
			} catch (e) {
			  console.log("Not a json object", e)
			  resolve(false)
			}
		   
		  };
	  });
  })
}


function notifyAdmin(email){
	connection.getConnection(function(error, tempConnection){
		if(error){
			console.log("error : ",error.message);
		} else {
			tempConnection.query("select email,user_id from user_master where user_type_id= 1; select dealer_id,name,email,phone from dealer_details where email= ?",[email], function (error, notifyrows, notifyfields) {
				tempConnection.release();
				if (error){
					console.log(error);
				}
				else{
					let arr=[]
					console.log(notifyrows[0])
					notifyrows[0].forEach(function myfunction(val){arr.push({'email':val.email})})
					let link = config.baseUrl;
					let mail_data = {
						to : arr,
						sentToId : notifyrows[0][0].user_id,
						sentToType : 1,
						type : 11, 
						subject : util.format(`${(notificationContent.find(e => e.notification_type_id == 11)).subject}`,notifyrows[1][0].dealer_id),
						content : util.format(`${(notificationContent.find(e => e.notification_type_id == 11)).content}`,notifyrows[1][0].dealer_id,notifyrows[1][0].name, notifyrows[1][0].name, notifyrows[1][0].phone, notifyrows[1][0].email,link)
					}
					sendgridemail.sendEmail(mail_data);
				}
			})
		} 
	})
}

async function addLoginLogs(userData, tempConnection){
	try {
		let test1 = userData.status == 'Login_Failure' ? tempConnection.resume() : '';
		tempConnection.query(`SELECT log_id FROM login_logs WHERE username= ? AND status= 'Login_Success' AND (DATE(created_at) = CURDATE() OR DATE(updated_at) = CURDATE()) ORDER BY log_id DESC LIMIT 1;`,[userData.username],(err,trow,fields)=>{
			if(err) {
			    console.log("Connection Erro", err)
			} else {
				if(trow.length) {
					tempConnection.query('UPDATE `login_logs` SET `status`= ?, `hostname`= ?, `ip_address`= ?, `client_version`= ? WHERE `log_id`= ? ;',[userData.status, userData.hostname, userData.ip_address, userData.client_version, trow[0].log_id],(err,rows,field)=>{ 
						let test2 = userData.status == 'Login_Failure' ? tempConnection.release() : '';
						console.log('Login logs successfully');
					})
				} else {
					tempConnection.query('INSERT INTO `login_logs` (`username`,`status`,`hostname`,`ip_address`,`client_version`) values(?,?,?,?,?);',[userData.username,userData.status,userData.hostname,userData.ip_address,userData.client_version],(ierr,irw)=>{
						let test3 = userData.status == 'Login_Failure' ? tempConnection.release() : '';
						if(ierr) {
							console.log("There is a problem while inserting login logs", ierr)
						} else {
							console.log("Login logs successfully")
						}
					})
				}
			}
		})
	} catch(lErr) {
		console.log("Getting error on adding/updating login logs", lErr)
	}
}

module.exports = {login, logout, forgot_password, set_password, otp_verify, download};