const cron = require("node-cron");
let router = require('express').Router();
let util = require('util');
let config = require('../config');
let request = require('request');
let connection = require('mysql').createPool(config.database);
let mysql = require('mysql');
//var bodyParser = require('body-parser');
let moment = require('moment');
let jsoncsv = require('json2csv');
let email = require('../lib/email');
let notificationContent = require('../lib/notificationContent');
let waNotify = require('./waNotification');

function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}

cron.schedule("*/20 7-20 * * *", function (funcout) {
    try {
        connection.getConnection((connectionErr,tempConnection)=> { 
            if(connectionErr) {
                console.log("Connection Error, LSQ Buffer Table Process")
            } else {
                //SELECT * FROM wa_groups WHERE created_at <= DATE_SUB(NOW(), INTERVAL 37 MINUTE) AND status = 0
                let getLeads = `SELECT * FROM wa_groups WHERE created_at <= DATE_SUB(NOW(), INTERVAL 20 MINUTE) AND status = 0 LIMIT 2`;
                tempConnection.query(getLeads, async (err, rows, field) => {
                    if(err) {
                        console.log("Fetch Error", err)
                        tempConnection.release()
                    } else {
                        if(rows.length) {
                            for (let vindex = 0; vindex < rows.length; vindex++) {
                                var element = rows[vindex];
                                new Promise((resolve) => {
                                    const options = {
                                        url: `https://api-in21.leadsquared.com/v2/LeadManagement.svc/LeadOwner.Get?accessKey=u$r8146066da4d93d6b42651c7ac5be3c3d&secretKey=c70ce74d6836415c614ea6000ea19178eed26da2&LeadIdentifier=LeadId&value=${element.lsq_id}`,
                                        method: 'GET',
                                        headers: {
                                          'Accept': 'application/json',
                                        }
                                    };

                                    request(options, async function (apiErr, res, lsqBody) {
                                        if(apiErr) {
                                            console.log("Unable to call Lsq Retrieve Lead API", apiErr)
                                        } else {
                                            resolve(lsqBody)
                                        }
                                    })
                                }).then((lsqData) => {
                                    console.log(lsqData)
                                    var lsData = JSON.parse(lsqData)
                                    console.log(element.contacts.split(","))
                                    let groupContacts = element.contacts.split(",")
                                    if(lsData.length) {
                                        let allowedNumbers = ['8006434465']
                                        let ownerPhone = (lsData[0].PhoneMobile) ? lsData[0].PhoneMobile.split("-")[1] : "";
                                        let ownerPhone2 = (lsData[0].PhoneOthers) ? lsData[0].PhoneOthers.split("-")[1] : "";
                                        let leadLSQOWner = (ownerPhone2) ? ownerPhone2 : ownerPhone;
                                        if(allowedNumbers.includes(leadLSQOWner)) {
                                            groupContacts.push(`91${leadLSQOWner}`);
                                            //console.log(groupContacts)
                                            
                                            //Create WhatsApp Group
                                            var options = {
                                                'method': 'POST',
                                                'url': 'https://wa-lgs.rpsapi.in/create-group',
                                                'headers': {
                                                    'Content-Type': 'application/json',
                                                    'x-admin-key': 'ejsisjksDSDIUSDSDsjjjsjdjdjdjdjjje23233KLSJDH92025JKsdEdsLG'
                                                },
                                                body: JSON.stringify({
                                                    "groupName": `${element.lead_name}-Apply4Study`,
                                                    "contacts": groupContacts,
                                                    "customerPhone": element.customer_phone
                                                })
                                            };

                                            request(options, function (error, response) {
                                                if (error) throw new Error(error);
                                                console.log(response.body);
                                                let waRes = JSON.parse(response.body)
                                                if(waRes.success) {
                                                    let updateWA = mysql.format(`UPDATE wa_groups SET group_id=?, response=?, status=? WHERE id=?;`, [waRes.groupid, waRes.message, 1, element.id]);
                                                    tempConnection.query(updateWA, function (upsErr, result) {
                                                        if(upsErr) console.log("Update WA Group Table Error", upsErr)
                                                        console.log("WA Group table updated with response")
                                                    })
                                                } else {
                                                    let updateWA = mysql.format(`UPDATE wa_groups SET response=?, status=? WHERE id=?;`, [waRes.message, 2, element.id]);
                                                    tempConnection.query(updateWA, function (upsErr, result) {
                                                        if(upsErr) console.log("Update WA Group Table Error", upsErr)
                                                        console.log("WA Group table updated with response")
                                                    })
                                                    console.log("There is a problem while creating the group")
                                                }
                                            });
                                        } else {
                                            let updateWA = mysql.format(`UPDATE wa_groups SET response=?, status=? WHERE id=?;`, ["Lead owner is not allowed in the list", 3, element.id]);
                                            tempConnection.query(updateWA, function (upsErr, result) {
                                                if(upsErr) console.log("Update WA Group Table Error", upsErr)
                                                console.log("WA Group table updated with response")
                                            })
                                            console.log("There is a problem while creating the group")
                                        }
                                    }
                                })
                                await delay(180000);

                            }
                        }
                    }
                })
            }
            tempConnection.release()
        })
    } catch (e) {
        console.log("There is problem while processing the group creation", e)
    }

})