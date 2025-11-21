let config = require('../config');
let util = require('util');
let request = require('request');
const { resolve } = require('path');

module.exports.updateLead = async function (phone, type, capacity, amount, lsqId, conversionType, sale_date = null) {
	return new Promise((resolve)=>{ 
		var sendLsq = [
			{ "Attribute": "mx_System_Type_Sold", "Value": type },
			{ "Attribute": "mx_Final_System_Capacity", "Value": capacity },
			{ "Attribute": "mx_Sale_Done_Amount", "Value": amount },
			{"Attribute": "mx_Type_of_Conversion", "Value": conversionType}

		]

		if(sale_date != null && sale_date != "") {
			sendLsq.push({ "Attribute": "mx_Sale_Done_Date", "Value": sale_date })
		}

		console.log("LSQQ", sendLsq)
		request.post(`https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Update?accessKey=u$r8146066da4d93d6b42651c7ac5be3c3d&secretKey=c70ce74d6836415c614ea6000ea19178eed26da2&leadId=${lsqId}`, {
					json: sendLsq
		}, (error, res, body) => {
			console.log(body)
			if (error) {
				console.log("There is a problem while creating lead in the LSQ - Single Interface", error)

				resolve({success: false, error_msg: error, msg: 'There is a problem while creating lead in the LSQ - Single Interface'})
			}
			if (body.Status == 'Success') {
				resolve({success: true,  msg: body})
			}
		});
	})
}

module.exports.updateStage = async function (lsq_id, status, conversionType="") {
	return new Promise((resolve) => {

		let prospectStatus = [
								{
									"Attribute": "ProspectStage", "Value": `${status}` 
								}
							]

		if(conversionType != null && conversionType != "") {
			prospectStatus.push({"Attribute": "mx_Type_of_Conversion", "Value": conversionType})
		}

		//console.log(prospectStatus);
		request.post(`https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Update?accessKey=u$r8146066da4d93d6b42651c7ac5be3c3d&secretKey=c70ce74d6836415c614ea6000ea19178eed26da2&leadId=${lsq_id}`, {
			json: prospectStatus
		},(error, res, body) => {
			if (error) {
				console.error(error);
				resolve(false);
			}
			resolve(res.body)
		})
	})
};

module.exports.postActivity = async function (lsq_id, event_id, note, status = null, reqBy = null) { 
	return new Promise((resolve) => {
		let leadActivity = {
							"RelatedProspectId" :`${lsq_id}`,
							"ActivityEvent": event_id,
							"ActivityNote": `${note}`
							// "Fields": [
							// 	{
							// 		"SchemaName": "mx_Custom_1",
							// 		"Value": reqBy
							// 	}
							// ]
						 }
		if(reqBy) {
			leadActivity.Fields = [
				{
					"SchemaName": "mx_Custom_1",
					"Value": reqBy
				}
			]
		}

		if(status == "deal_lost") {
			leadActivity.Fields = [
				{
					"SchemaName": "Status",
					"Value": "RT Order"
				}
			]
		}

		//console.log(leadActivity)
		request.post(`https://api-in21.leadsquared.com/v2/ProspectActivity.svc/Create?accessKey=u$r8146066da4d93d6b42651c7ac5be3c3d&secretKey=c70ce74d6836415c614ea6000ea19178eed26da2&leadId=${lsq_id}`, {
			json: leadActivity
		},(error, res, body) => {
			if (error) {
				console.error(error);
				resolve(false);
			}
			resolve(res.body)
		})
	})
	
};

module.exports.postCustomActivity = async function (lsq_id, event_id, note, status = null, l1Remarks = null, l2Remarks = null, reqBy = null) {
	return new Promise((resolve) => {
		let leadActivity = {
			"RelatedProspectId" :`${lsq_id}`,
			"ActivityEvent": event_id,
			"ActivityNote": `${note}`
		}

		switch(status)
		{
			case "ss_rescheduled" :
				leadActivity.Fields = [
					{
						"SchemaName": "mx_Custom_1",
						"Value": "Site Reschedule Follow-up"
					},
					{
						"SchemaName": "mx_Custom_2",
						"Value": "Site Visit Rescheduled"
					},
					{
						"SchemaName": "mx_Custom_3",
						"Value": l1Remarks
					},
				];
			break;
			case "ss_hold" :
				leadActivity.Fields = [
					{
						"SchemaName": "mx_Custom_1",
						"Value": "Site Survey Status"
					},
					{
						"SchemaName": "mx_Custom_2",
						"Value": "In Follow up"
					},
					{
						"SchemaName": "mx_Custom_3",
						"Value": ["Hold after visit","Hold before visit"].includes(l1Remarks) ? l1Remarks : "On Hold"
					},
				];
			break;
			case "ss_completed" :
				leadActivity.Fields = [
					{
						"SchemaName": "mx_Custom_1",
						"Value": "Site Survey Status"
					},
					{
						"SchemaName": "mx_Custom_2",
						"Value": "Site Visit Done"
					},
					{
						"SchemaName": "mx_Custom_3",
						"Value": "Site Visit Done"
					},
				];
			break;
			case "deal_lost" :
				leadActivity.Fields = [
					{
						"SchemaName": "Status",
						"Value": "Inactive"
					},
					{
						"SchemaName": "mx_Custom_1",
						"Value": 'Deal Lost'
					},
					{
						"SchemaName": "mx_Custom_2",
						"Value": l1Remarks
					},
					{
						"SchemaName": "mx_Custom_3",
						"Value": l2Remarks
					},
					{
						"SchemaName": "mx_Custom_9",
						"Value": reqBy
					},
				];
			break;
			default:
				leadActivity.Fields = [];
			break;
		}

		//console.log(leadActivity)
		request.post(`https://api-in21.leadsquared.com/v2/ProspectActivity.svc/Create?accessKey=u$r8146066da4d93d6b42651c7ac5be3c3d&secretKey=c70ce74d6836415c614ea6000ea19178eed26da2&leadId=${lsq_id}`, {
			json: leadActivity
		},(error, res, body) => {
			if (error) {
				console.error(error);
				resolve(false);
			}
			resolve(res.body)
		})
	})
};

module.exports.updateLeadOwner = async function (visityBy, visitEmail, visitMobile, lsqId) {
	return new Promise((resolve)=>{ 
		var sendLsq = [
			{ "Attribute": "mx_Visit_By", "Value": visityBy },
			{ "Attribute": "mx_Visit_by_Email", "Value": visitEmail },
			{ "Attribute": "mx_Visit_By_Mobile", "Value": visitMobile }
		]
		console.log("LSQQ", sendLsq)
		request.post(`https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Update?accessKey=u$r8146066da4d93d6b42651c7ac5be3c3d&secretKey=c70ce74d6836415c614ea6000ea19178eed26da2&leadId=${lsqId}`, {
					json: sendLsq
		}, (error, res, body) => {
			console.log(body)
			if (error) {
				console.log("There is a problem while creating lead in the LSQ - Single Interface", error)

				resolve({success: false, error_msg: error, msg: 'There is a problem while creating lead in the LSQ - Single Interface'})
			}
			if (body.Status == 'Success') {
				resolve({success: true,  msg: body})
			}
		});
	})
}

module.exports.createLeadNote = async function (remark, lsqId) {
	return new Promise((resolve)=>{
		var sendLsq = { "RelatedProspectId": lsqId, "Note": remark }
		request.post(`https://api-in21.leadsquared.com/v2/LeadManagement.svc/CreateNote?accessKey=u$r8146066da4d93d6b42651c7ac5be3c3d&secretKey=c70ce74d6836415c614ea6000ea19178eed26da2`, {
			json: sendLsq
		}, (error, res, body) => {
			if (error) {
				console.log("There is a problem while updating lead in the LSQ - Single Interface", error)
				resolve({success: false, error_msg: error, msg: 'There is a problem while updating lead in the LSQ - Single Interface'})
			}
			if (body.Status == 'Success') {
				resolve({success: true,  msg: body})
			}
		});
	})
}

module.exports.scheduleSiteSurvey = async function(scheduleData) {
	return new Promise((resolve) => {
		var options = {
			'method': 'POST',
			'url': `${config.baseUrl}/api/sitesurvey/schedule`,
			'headers': {
			  'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWFsZXJfaWQiOjU5LCJ1c2VyX3R5cGVfaWQiOjMsInJvbGUiOiJBZG1pbiIsImlhdCI6MTczNDM0ODk1NSwiZXhwIjoxODAzNDY4OTU1fQ.edlIX3_J11IR4IzlFWuLpO3nzvNHCegGjpg_QwOhGvI',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			  "enable": "1",
			  "schedule_date": scheduleData.schedule_date,
			  "schedule_time": scheduleData.schedule_time,
			  "homeowner_id": scheduleData.homeowner_id,
			  "leadowner": scheduleData.leadowner,
			  "schedule_date_alt": scheduleData.schedule_date_alt,
			  "schedule_time_alt": scheduleData.schedule_time_alt
			})
		  
		};
		request(options, function (error, response) {
			if (error) {resolve(false)}
			resolve(response.body);
		});
		  
	})
}

module.exports.updateSiteVisitDate = async function (lsq_id, siteVisitDate, visitType='scheduled') {
	return new Promise((resolve) => {
		var visitDate = [
			{
				"Attribute": "mx_Site_Visit_Date", "Value": `${siteVisitDate}`
			}
		];
		if(visitType == "rescheduled"){
			visitDate = [
				{
					"Attribute": "mx_Site_Rescheduled_Date", "Value": `${siteVisitDate}`
				}
			];
		}
		if(visitType == "done"){
			visitDate = [
				{
					"Attribute": "mx_Site_Visit_Completed", "Value": `${siteVisitDate}`
				}
			];
		}
		request.post(`https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Update?accessKey=u$r8146066da4d93d6b42651c7ac5be3c3d&secretKey=c70ce74d6836415c614ea6000ea19178eed26da2&leadId=${lsq_id}`, {
			json: visitDate
		},(error, res, body) => {
			if (error) {
				console.error(error);
				resolve(false);
			}
			resolve(res.body)
		})
	})
};

module.exports.rescheduleSiteSurvey = async function(scheduleData) {
	return new Promise((resolve) => {
		var options = {
			'method': 'POST',
			'url': `${config.baseUrl}/api/sitesurvey/update_status`,
			'headers': {
			  'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWFsZXJfaWQiOjU5LCJ1c2VyX3R5cGVfaWQiOjMsInJvbGUiOiJBZG1pbiIsImlhdCI6MTczNDM0ODk1NSwiZXhwIjoxODAzNDY4OTU1fQ.edlIX3_J11IR4IzlFWuLpO3nzvNHCegGjpg_QwOhGvI',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			  "name": "survey_rescheduled",
			  "status": "rescheduled",
			  "enable": "1",
			  "schedule_date": scheduleData.schedule_date,
			  "schedule_time": scheduleData.schedule_time,
			  "homeowner_id": scheduleData.homeowner_id,
			  "leadowner": scheduleData.leadowner,
			  "reason": scheduleData.reason,
    		  "comment": scheduleData.comment
			})		  
		};
		request(options, function (error, response) {
			if (error) {resolve(false)}
			resolve(response.body);
		});
	})
}

module.exports.createLeadAttachment = async function (lsqActivityId,file_name,file_desc="",file_link) {
	return new Promise((resolve)=>{
		var sendLsq = { "ProspectActivityId": lsqActivityId, "AttachmentName": file_name, "Description": file_desc, "AttachmentFile": file_link }
		request.post(`https://api-in21.leadsquared.com/v2/ProspectActivity.svc/Attachment/Add?accessKey=u$r8146066da4d93d6b42651c7ac5be3c3d&secretKey=c70ce74d6836415c614ea6000ea19178eed26da2`, {
			json: sendLsq
		}, (error, res, body) => {
			if (error) {
				console.log("There is a problem while creating lead attachment in the LSQ - Single Interface", error)
				resolve({success: false, error_msg: error, msg: 'There is a problem while creating lead attachment in the LSQ - Single Interface'})
			}
			if (body.Status == 'Success') {
				resolve({success: true,  msg: body})
			}
		});
	})
}

module.exports.updateLeadAttribute = async function (lsqId, attributes=[]) {
	return new Promise((resolve)=>{ 
		var sendLsq = [];

		if(attributes && Object.keys(attributes).length) {
			Object.entries(attributes).forEach(([key, value]) => {
			    if (value !== "" && value !== null && value !== undefined) {
			      	sendLsq.push({ Attribute: key, Value: value });
			    }
		  	});
		}

		if (sendLsq && sendLsq.length) {
			console.log("LSQQ", sendLsq)
			request.post(`https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Update?accessKey=u$r8146066da4d93d6b42651c7ac5be3c3d&secretKey=c70ce74d6836415c614ea6000ea19178eed26da2&leadId=${lsqId}`, {
						json: sendLsq
			}, (error, res, body) => {
				console.log(body)
				if (error) {
					console.log("There is a problem while update lead in the LSQ - Single Interface", error)
					resolve({success: false, error_msg: error, msg: 'There is a problem while updating lead in the LSQ - Single Interface'})
				}
				if (body.Status == 'Success') {
					resolve({success: true,  msg: body})
				}
			});
		} else {
			console.log("No attribute updated lead in the LSQ - Single Interface", error)
			resolve({success: false, msg: 'No attribute updated in the LSQ - Single Interface'})
		}
	})
}