let config = require('../config');
let util = require('util');
let request = require('request');
const { resolve } = require('path');
let email = require('../lib/email');
let notificationContent = require('../lib/notificationContent');
let connection = require('mysql').createPool(config.database);
const axios = require("axios").default;
const phoneNoId = config.phoneID;
const metatk = config.METATK


function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}

module.exports.getHomeOwner = async function (homeownerId) {
	return new Promise((resolve) => {
		try {
			connection.getConnection((error,tempConnection)=>{
				if(error){
					resolve(false)
				} else {
					let selectCustomer = `SELECT firstname,email,phone,city,state,pincode,tsales_owner_email,sales_owner_id FROM lms_leads WHERE homeowner_id = ?`;
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

module.exports.WASiteSurveyReminder = async function (reminderData) {
	return new Promise((resolve) => {
		let dataComps = [
			{
				type: "header",
				parameters: [
					{
						type: "document",
						document: {
							link : reminderData.file,
                            filename: reminderData.filename
						}
					}
				]
			},
			{
				type: "body",
				parameters: [
					{
						type: "text",
						text: reminderData.name
					},
					{
						type: "text",
						text: reminderData.dates
					}
				]
			}
		]

		var sndFormData = {
			name: 'site_survey_reminder',
			language: {
				code: "en"
			},
			components: dataComps                  
		}
		axios({
			method: "POST", // Required, HTTP method, a string, e.g. POST, GET
			url:
				"https://graph.facebook.com/v19.0/" +
				phoneNoId +
				"/messages",
			data: { 
					messaging_product: "whatsapp",
					recipient_type: "individual",
					to: reminderData.phone,
					type: "template",
					template: sndFormData
				},
			headers: { "Content-Type": "application/json",
						Authorization: `Bearer ${metatk}`,
			},
		}).then(res => {
			console.log(res)
			resolve(true)
		})
	})
}

//Trigger WhatsApp notification when new lead is allocated
module.exports.WANewLead = async function (mailData) {
	return new Promise((resolve) => {
		let ownerDetails = getDealerEmail([mailData.leadrm, mailData.leadowner]).then((getPhoneNo) => {
			dataComps = [
				{
					type: "body",
					parameters: [
						{
							type: "text",
							text: getPhoneNo.name
						},
						{
							type: "text",
							text: mailData.name
						},
						{
							type: "text",
							text: mailData.phone
						},
						{
							type: "text",
							text: mailData.address
						},
						{
							type: "text",
							text: mailData.status
						}
					]
				}
			];
			
			var sndFormData = {
				name: 'lead_allocation',
				language: {
					code: "en"
				},
				components: dataComps                  
			}
	
			console.log(dataComps[0].parameters)
			axios({
				method: "POST", // Required, HTTP method, a string, e.g. POST, GET
				url:
					"https://graph.facebook.com/v19.0/" +
					phoneNoId +
					"/messages",
				data: { 
						messaging_product: "whatsapp",
						recipient_type: "individual",
						to: getPhoneNo.phone,
						type: "template",
						template: sndFormData
					},
				headers: { "Content-Type": "application/json",
							Authorization: `Bearer ${metatk}`,
				},
			}).then(res => {
				console.log(res)
				resolve(true)
			})
		})

		
	})	
}

//Trigger WhatsApp notification when new lead is allocated
module.exports.sendEscalation = async function (summaryData) {
	return new Promise(async (resolve) => {
		let escalationPhoneNos = ['9566767013', '9999908815']
		for (let index = 0; index < escalationPhoneNos.length; index++) {
			let phone = escalationPhoneNos[index];
			dataComps = [
				{
					type: "body",
					parameters: [
						{
							type: "text",
							text: summaryData
						},
					]
				}
			];
			
			var sndFormData = {
				name: 'tat_escalation',
				language: {
					code: "en"
				},
				components: dataComps                  
			}
	
			console.log(dataComps[0].parameters)
			axios({
				method: "POST", // Required, HTTP method, a string, e.g. POST, GET
				url:
					"https://graph.facebook.com/v19.0/" +
					phoneNoId +
					"/messages",
				data: { 
						messaging_product: "whatsapp",
						recipient_type: "individual",
						to: phone,
						type: "template",
						template: sndFormData
					},
				headers: { "Content-Type": "application/json",
							Authorization: `Bearer ${metatk}`,
				},
			}).then(res => {
				console.log(res.data)
				//resolve(true)
			})
			await delay(500)
		}
		resolve(true)
	})	
}

//Trigger WhatsApp notification when to send reminder for App Use
module.exports.sendAppUseReminder = async function (appReminderData) {
	return new Promise(async (resolve) => {
		var dataComps = [
			{
				type: "body",
				parameters: [
					{
						type: "text",
						text: appReminderData.name
					},
				]
			}
		];

		var sndFormData = {
			name: 'app_use_reminder',
			language: {
				code: "en"
			},
			components: dataComps
		}

		axios({
			method: "POST",
			url:"https://graph.facebook.com/v19.0/" + phoneNoId + "/messages",
			data: {
				messaging_product: "whatsapp",
				recipient_type: "individual",
				to: appReminderData.phone,
				type: "template",
				template: sndFormData
			},
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${metatk}` },
		}).then(res => {
			//console.log(res.data)
			//resolve(true)
		})
		await delay(500)
		resolve(true)
	})
}

//Trigger WhatsApp notification when to send lead's follow up reminder
module.exports.sendLeadFollowUpReminder = async function (followUpReminderData) {
	return new Promise(async (resolve) => {
		// console.log("reminder data ",followUpReminderData);
		var dataComps = [
			{
				type: "header",
				parameters: [
					{
						type: "document",
						document: {
							link : followUpReminderData.file,
                            filename: followUpReminderData.filename
						}
					}
				]
			},
			{
				type: "body",
				parameters: [
					{
						type: "text",
						text: followUpReminderData.name
					}
				]
			}
		];

		var sndFormData = {
			name: 'lead_followup_reminder',
			language: {
				code: "en"
			},
			components: dataComps
		}

		axios({
			method: "POST",
			url:"https://graph.facebook.com/v19.0/" + phoneNoId + "/messages",
			data: {
				messaging_product: "whatsapp",
				recipient_type: "individual",
				to: followUpReminderData.phone,
				type: "template",
				template: sndFormData
			},
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${metatk}` },
		}).then(res => {
			//console.log(res.data)
			//resolve(true)
		})
		await delay(500)
		resolve(true)
	})
}