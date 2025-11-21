let config = require('../config');
let util = require('util');
let request = require('request');
const { resolve } = require('path');
let email = require('../lib/email');
let notificationContent = require('../lib/notificationContent');
let connection = require('mysql').createPool(config.database);


module.exports.getHomeOwner = async function (homeownerId) {
	return new Promise((resolve) => {
		try {
			connection.getConnection((error,tempConnection)=>{
				if(error){
					resolve(false)
				} else {
					let selectCustomer = `SELECT firstname,email,phone,city,state,pincode,tsales_owner_email,sales_owner_id,lead_owner FROM lms_leads WHERE homeowner_id = ?`;
					tempConnection.query(selectCustomer, [homeownerId], (err, rows, field) => {
						if(err) {
							resolve(false)
							return;
						} 
						if(rows.length) {
							resolve(rows[0]);
						} else {	
							resolve(false)
						}
					})
				}
			})
		} catch (e) {

		}
	})
}

async function getDealerEmail (dealers) {
	return new Promise((resolve) => {
		connection.getConnection((error,tempConnection)=>{
			if(error){
				resolve(false)
			} else {
				console.log("IDS", dealers)
				var emailId = {};

				emailId.asmemails = [];
				/*if ( dealers.length > 1 )
				{
					let leadOwner = Number(dealers[1]);
					let selectASM = `SELECT A.dealer_id,A.email,A.name,A.occupation,A.phone FROM solar_team T INNER JOIN dealer_details A ON T.asm_id = A.dealer_id WHERE T.asm_id IS NOT NULL AND (T.rm_id = ? OR T.ssm_id = ?) AND A.occupation = 'ASM' GROUP BY A.dealer_id;`;
					tempConnection.query(selectASM, [leadOwner,leadOwner], (err, rows, field) => {
						if(rows.length > 0) {
							rows.forEach(element => {
								emailId.asmemails.push(element.email)
							});
						}
					});
				}*/

				let selectDealer = `SELECT dealer_id,email,name,occupation,phone FROM dealer_details WHERE dealer_id IN (?)`;
				tempConnection.query(selectDealer, [dealers], (err, rows, field) => {
					let dealerEmails = rows;
					if(rows.length > 1) {
						if(dealerEmails[0].occupation == "RM") {
							emailId.cc = dealerEmails[0].email;
							emailId.rmname = dealerEmails[0].name;
							emailId.to = dealerEmails[1].email;
							emailId.name = dealerEmails[1].name;
							emailId.phone = dealerEmails[1].phone;
							//emailId.name = dealerEmails[0].name;
						} else if(dealerEmails[1].occupation == "RM") {
							emailId.cc = dealerEmails[1].email;
							emailId.rmname = dealerEmails[1].name;
							emailId.to = dealerEmails[0].email;
							emailId.name = dealerEmails[0].name;
							emailId.phone = dealerEmails[0].phone;
						}
												
					} else {
						emailId.to = dealerEmails[0]?.email;
						emailId.rmname = dealerEmails[0]?.name;
						emailId.name = dealerEmails[0]?.name;
						emailId.cc = dealerEmails[0]?.email;		
						emailId.phone = dealerEmails[0]?.phone;						
					}

					resolve(emailId)
				});
			}
		})
		
	})
	
}

module.exports.newLeadNotifyEmail = async function (mailData) {
	return new Promise((resolve) => {
		let emailIDS = getDealerEmail([mailData.leadrm, mailData.leadowner]).then((getIds) => {
			console.log(mailData);
			if(getIds) {
				mailData.teleSales.push(getIds.cc)
				if (getIds.asmemails.length > 0)
				{
					getIds.asmemails.forEach(mail => {
						mailData.teleSales.push(mail);
					});
				}
				let address = mailData.address;
				let mail_data = {
					to : getIds.to,
					sentToId : mailData.leadowner,
					sentToType : 3,
					type : 29,
					phone: mailData.phone,
					code: mailData.code,
					ccEmails: mailData.teleSales,
					subject : util.format(`${(notificationContent.find(e => e.notification_type_id == 29)).subject}`),
					content : util.format(`${(notificationContent.find(e => e.notification_type_id == 29)).content}`, getIds.name,mailData.name,mailData.phone,mailData.email,address)
				}
				mail_data.rmId = mailData.leadrm;
				let emRes = email.sendEmail(mail_data);
				resolve(emRes)
			} else {
				resolve(false)
			}

		});
				
	})	
}

module.exports.ownershipEmail = async function (mailData) {
	return new Promise((resolve) => {
		let emailIDS = getDealerEmail([mailData.leadrm, mailData.leadowner]).then((getIds) => {
			//console.log(mailData);
			if(getIds) {
				mailData.teleSales.push(getIds.cc)
				if (getIds.asmemails.length > 0)
				{
					getIds.asmemails.forEach(mail => {
						mailData.teleSales.push(mail);
					});
				}
				let mail_data = {
					to : getIds.to,
					sentToId : mailData.leadowner,
					sentToType : 3,
					type : 31,
					phone: mailData.phone,
					code: mailData.code,
					ccEmails: mailData.teleSales,
					subject : util.format(`${(notificationContent.find(e => e.notification_type_id == 31)).subject}`),
					content : util.format(`${(notificationContent.find(e => e.notification_type_id == 31)).content}`, getIds.name,mailData.name,mailData.phone,mailData.email,`${mailData.city}, ${mailData.state}-${mailData.pincode}`)
				}
				mail_data.rmId = mailData.leadrm;
				let emRes = email.sendEmail(mail_data);
				resolve(emRes)
			} else {
				resolve(false)
			}

		});
				
	})	
}


module.exports.estimationReqNotifyEmail = async function (mailData) {
	return new Promise((resolve) => {
		let emailIDS = getDealerEmail([mailData.leadrm, mailData.leadowner]).then((getIds) => {
			//console.log(mailData);
			if(getIds) {
				mailData.teleSales.push(getIds.cc)
				if (getIds.asmemails.length > 0)
				{
					getIds.asmemails.forEach(mail => {
						mailData.teleSales.push(mail);
					});
				}
				let mail_data = {
					to : mailData.teleSaleEmail,
					sentToId : mailData.leadowner,
					sentToType : 3,
					type : 53,
					phone: mailData.phone,
					code: mailData.code,
					ccEmails: mailData.teleSales,
					subject : util.format(`${(notificationContent.find(e => e.notification_type_id == 53)).subject}`),
					content : util.format(`${(notificationContent.find(e => e.notification_type_id == 53)).content}`, mailData.teleSaleName,getIds.name,mailData.name, mailData.phone,`${mailData.city}, ${mailData.state}-${mailData.pincode}`, getIds.rmname, `${getIds.name}/${getIds.phone}`, mailData.details)
				}
				mail_data.rmId = mailData.leadrm;
				let emRes = email.sendEmail(mail_data);
				resolve(emRes)
			} else {
				resolve(false)
			}

		});
				
	})	
}

module.exports.statusNotifyEmail = async function (mailData) {
	return new Promise((resolve) => {
		let emailIDS = getDealerEmail([mailData.leadrm, mailData.leadowner]).then((getIds) => {
			//console.log(mailData);
			if(getIds) {
				mailData.teleSales.push(getIds.cc)
				if (getIds.asmemails.length > 0)
				{
					getIds.asmemails.forEach(mail => {
						mailData.teleSales.push(mail);
					});
				}
				let mail_data = {
					to : getIds.to,
					sentToId : mailData.leadowner,
					sentToType : 3,
					type : 54,
					phone: mailData.phone,
					code: mailData.code,
					ccEmails: mailData.teleSales,
					subject : util.format(`${(notificationContent.find(e => e.notification_type_id == 54)).subject}`),
					content : util.format(`${(notificationContent.find(e => e.notification_type_id == 54)).content}`, getIds.name,mailData.status,mailData.name, mailData.phone,`${mailData.city}, ${mailData.state}-${mailData.pincode}`,mailData.comment, getIds.rmname, `${getIds.name}/${getIds.phone}`)
				}
				mail_data.rmId = mailData.leadrm;
				let emRes = email.sendEmail(mail_data);
				resolve(emRes)
			} else {
				resolve(false)
			}

		});
				
	})	
}

module.exports.siteVisitNotifyEmail = async function (mailData) {
	return new Promise((resolve) => {
		let emailIDS = getDealerEmail([mailData.leadrm, mailData.leadowner]).then((getIds) => {
			//console.log(mailData);
			if(getIds) {
				mailData.teleSales.push(getIds.cc)
				if (getIds.asmemails.length > 0)
				{
					getIds.asmemails.forEach(mail => {
						mailData.teleSales.push(mail);
					});
				}
				let mail_data = {
					to : getIds.to,
					sentToId : mailData.leadowner,
					sentToType : 3,
					type : 55,
					phone: mailData.phone,
					code: mailData.code,
					ccEmails: mailData.teleSales,
					subject : util.format(`${(notificationContent.find(e => e.notification_type_id == 55)).subject}`, mailData.status),
					content : util.format(`${(notificationContent.find(e => e.notification_type_id == 55)).content}`, getIds.name,mailData.status,mailData.name, mailData.phone,`${mailData.city}, ${mailData.state}-${mailData.pincode}`,mailData.time, getIds.rmname, `${getIds.name}/${getIds.phone}`, mailData.reason, mailData.comment)
				}
				mail_data.rmId = mailData.leadrm;
				let emRes = email.sendEmail(mail_data);
				resolve(emRes)
			} else {
				resolve(false)
			}

		});
				
	})	
}

module.exports.sedReqNotifyEmail = async function (mailData) {
	return new Promise((resolve) => {
		let mail_data = {
			to : mailData.to,
			sentToId : 705,
			sentToType : 3,
			type : 55,
			phone: mailData.phone,
			code: mailData.code,
			ccEmails: [mailData.cc],
			subject : util.format(`${(notificationContent.find(e => e.notification_type_id == 56)).subject}`),
			content : util.format(`${(notificationContent.find(e => e.notification_type_id == 56)).content}`, `${mailData.name}`, mailData.phone, `${mailData.city}, ${mailData.state}`, mailData.cc)
		}
		let emRes = email.sendEmail(mail_data);
		resolve(emRes)
	})	
}

module.exports.sedRevNotifyEmail = async function (mailData) {
	return new Promise((resolve) => {
		let mail_data = {
			to : mailData.to,
			sentToId : 705,
			sentToType : 3,
			type : 55,
			phone: mailData.phone,
			code: mailData.code,
			ccEmails: [mailData.cc],
			subject : util.format(`${(notificationContent.find(e => e.notification_type_id == 57)).subject}`),
			content : util.format(`${(notificationContent.find(e => e.notification_type_id == 57)).content}`, `${mailData.name}`, mailData.phone, `${mailData.city}, ${mailData.state}`, mailData.cc)
		}
		let emRes = email.sendEmail(mail_data);
		resolve(emRes)
	})	
} 

module.exports.sedActionNotifyEmail = async function (mailData) {
	return new Promise((resolve) => {
		let subject = ""
		let content = ""
		if(mailData.actionStatus.toLowerCase() == "approved") {
			subject = util.format(`${(notificationContent.find(e => e.notification_type_id == 58)).subject}`),
			content = util.format(`${(notificationContent.find(e => e.notification_type_id == 58)).content}`, `${mailData.company}`, `${mailData.phone}`, `${mailData.phone}`)
		} else {
			subject = util.format(`${(notificationContent.find(e => e.notification_type_id == 59)).subject}`),
			content = util.format(`${(notificationContent.find(e => e.notification_type_id == 59)).content}`, `${mailData.company}`, `${mailData.name}`, `${mailData.phone}`, `${mailData.city}, ${mailData.state}`, `${mailData.comment}`)
		}
		let mail_data = {
			to : mailData.to,
			sentToId : 705,
			sentToType : 3,
			type : 55,
			phone: mailData.phone,
			code: mailData.code,
			ccEmails: [mailData.cc],
			subject : subject,
			content : content
		}
		let emRes = email.sendEmail(mail_data);
		resolve(emRes)
	})	
} 

module.exports.commissionNotifyEmail = async function (mailData) {
	return new Promise((resolve) => {
		let emailIDS = getDealerEmail([mailData.leadrm, mailData.leadowner]).then((getIds) => {
			//console.log(mailData);
			if(getIds) {
				mailData.teleSales.push(getIds.cc)
				let mail_data = {
					to :  mailData.teleSales,
					sentToId : mailData.leadowner,
					sentToType : 3,
					type : 54,
					phone: mailData.phone,
					code: mailData.code,
					ccEmails: ['test@yopmail.com', 'test@yopmail.com'],
					subject : util.format(`${(notificationContent.find(e => e.notification_type_id == 60)).subject}`),
					content : util.format(`${(notificationContent.find(e => e.notification_type_id == 60)).content}`, mailData.name, mailData.phone,`${mailData.address}`,mailData.pincode, mailData.state, mailData.district, mailData.city, mailData.systemType, mailData.ownername, mailData.ownerphone)
				}
				mail_data.rmId = mailData.leadrm;
				let emRes = email.sendEmail(mail_data);
				resolve(emRes)
			} else {
				resolve(false)
			}

		});
				
	})	
}

module.exports.commissionReqNotifyEmail = async function (mailData) {
	return new Promise((resolve) => {
		let emailIDS = getDealerEmail([mailData.leadrm, mailData.leadowner]).then((getIds) => {
			//console.log(mailData);
			if(getIds) {
				mailData.teleSales.push(getIds.cc)
				if (getIds.asmemails.length > 0)
				{
					getIds.asmemails.forEach(mail => {
						mailData.teleSales.push(mail);
					});
				}
				let mail_data = {
					to : mailData.to,
					sentToId : mailData.leadowner,
					sentToType : 3,
					type : 61,
					phone: mailData.phone,
					code: mailData.code,
					ccEmails: mailData.teleSales,
					subject : util.format(`${(notificationContent.find(e => e.notification_type_id == 61)).subject}`),
					content : util.format(`${(notificationContent.find(e => e.notification_type_id == 61)).content}`, getIds.name, mailData.status, mailData.name, mailData.phone,`${mailData.city}, ${mailData.state}-${mailData.pincode}`, getIds.rmname, `${getIds.name}/${getIds.phone}`, mailData.details)
				}
				mail_data.rmId = mailData.leadrm;
				let emRes = email.sendEmail(mail_data);
				resolve(emRes)
			} else {
				resolve(false)
			}
		});
	})	
}

module.exports.leadCommentNotifyEmail = async function (mailData) {
	return new Promise((resolve) => {
		let emailIDS = getDealerEmail([mailData.leadowner]).then((getIds) => {
			//console.log(mailData);
			if(getIds) {
				mailData.teleSales.push(getIds.to)
				if (getIds.asmemails.length > 0)
				{
					getIds.asmemails.forEach(mail => {
						mailData.teleSales.push(mail);
					});
				}
				let mail_data = {
					to :  [...new Set(mailData.teleSales)],
					sentToId : mailData.leadowner,
					sentToType : 3,
					type : 63,
					phone: mailData.phone,
					code: mailData.code,
					subject : util.format(`${(notificationContent.find(e => e.notification_type_id == 63)).subject}`),
					content : util.format(`${(notificationContent.find(e => e.notification_type_id == 63)).content}`, mailData.telesaleName, mailData.name, mailData.phone, `${mailData.city}/${mailData.state}`, mailData.comments)
				}
				mail_data.rmId = mailData.leadrm;
				let emRes = email.sendEmail(mail_data);
				resolve(emRes)
			} else {
				resolve(false)
			}
		});
	})
}

module.exports.leadVisitNotifyEmail = async function (mailData) {
	return new Promise((resolve) => {
		let emailIDS = getDealerEmail([mailData.leadrm, mailData.leadowner]).then((getIds) => {
			if(getIds) {
				mailData.teleSales.push(getIds.cc)
				if (getIds.asmemails.length > 0)
				{
					getIds.asmemails.forEach(mail => {
						mailData.teleSales.push(mail);
					});
				}
				let mail_data = {
					to :  getIds.to,
					sentToId : mailData.leadowner,
					sentToType : 3,
					type : 64,
					phone: mailData.phone,
					code: mailData.code,
					subject : util.format(`${(notificationContent.find(e => e.notification_type_id == 64)).subject}`, mailData.status),
					content : util.format(`${(notificationContent.find(e => e.notification_type_id == 64)).content}`, getIds.name, mailData.status, mailData.name, mailData.phone, `${mailData.address1}, ${mailData.city}/${mailData.state}`, mailData.visitType, mailData.time, mailData.comment, mailData.reason)
				}
				mail_data.rmId = mailData.leadrm;
				let emRes = email.sendEmail(mail_data);
				resolve(emRes)
			} else {
				resolve(false)
			}
		});
	})
}

module.exports.leadFollowUpNotifyEmail = async function (mailData) {
	return new Promise((resolve) => {
		let emailIDS = getDealerEmail([mailData.leadrm, mailData.leadowner]).then((getIds) => {
			if(getIds) {
				mailData.teleSales.push(getIds.cc)
				if (getIds.asmemails.length > 0)
				{
					getIds.asmemails.forEach(mail => {
						mailData.teleSales.push(mail);
					});
				}
				let mail_data = {
					to :  getIds.to,
					sentToId : mailData.leadowner,
					sentToType : 3,
					type : 65,
					phone: mailData.phone,
					code: mailData.code,
					subject : util.format(`${(notificationContent.find(e => e.notification_type_id == 65)).subject}`, mailData.status),
					content : util.format(`${(notificationContent.find(e => e.notification_type_id == 65)).content}`, getIds.name, mailData.status, mailData.name, mailData.phone, `${mailData.address1}, ${mailData.city}/${mailData.state}`, mailData.time, mailData.comment)
				}
				mail_data.rmId = mailData.leadrm;
				let emRes = email.sendEmail(mail_data);
				resolve(emRes)
			} else {
				resolve(false)
			}
		});
	})
}