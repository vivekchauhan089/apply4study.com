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
let waNotify = require('./waNotification')
var path = require('path');
const fsp = require('fs/promises');
global.appRoot = path.resolve();



//Run cron everyday 2 days once at 10.30AM
//*/2 * * * *
//30 10 */2 * *
cron.schedule("30 10 */2 * *", async function (funcout)
{
    try
    {
        reqBodyParams = []
        reqBodyParams['rm_id'] = "all"
        reqBodyParams['status'] = "all"
        reqBodyParams['leadAging'] = "4"

        await sendEscalationMessage(reqBodyParams)
        console.log("Cron Executed - sendEscalationMessage")
    }
    catch (e)
    {
        console.log("Cron Execution Error- sendEscalationMessage")
    }

});

async function sendEscalationMessage(reqBodyParams)
{

    var waMsg = []
    try
    {
        connection.getConnection((connectionErr, tempConnection) => {
            if (connectionErr)
            {
                console.log("Connection Erro", connectionErr)
                return;
            }
            else
            {

                rm_id = (reqBodyParams.rm_id) ? reqBodyParams.rm_id : "all";
                leadStatus = (reqBodyParams.status) ? reqBodyParams.status : "all";
                filterNoOfDays = (reqBodyParams.leadAging) ? reqBodyParams.leadAging : "all";

                varFilterRM = "";
                varFilterStatus = "";
                var varFilterNoOfDays = "";


                if (rm_id != "all")
                {
                    varFilterRM = `  dealer.dealer_id = '${rm_id}'  `;

                }
                else
                {
                    varFilterRM = " 1  ";
                }

                if (leadStatus != "all")
                {
                    varFilterStatus = ` AND lms.lead_status = '${leadStatus}' `;
                }
                else
                {
                    varFilterStatus = ` AND lms.lead_status IN ('new_lead' , 'ss_pending', 'ss_completed')`;
                }

                if (filterNoOfDays == "all")
                {
                    varFilterNoOfDays = '';
                }
                else
                {
                    varFilterNoOfDays = `AND lms.updated_at <  NOW() - INTERVAL ${filterNoOfDays} DAY`;
                }

                mQuery = mysql.format(`SELECT 
                    lms.sales_owner_id, 
                    dealer.name, 
                    COUNT(lms.homeowner_id) As countLeads
                FROM
                    lms_leads lms
                LEFT JOIN
                    dealer_details dealer ON dealer.dealer_id = lms.sales_owner_id
                WHERE
                    ${varFilterRM}
                    ${varFilterStatus}
                    AND sales_owner_id != ''
                    AND lms.active = 1
                    AND dealer.occupation = 'RM'
                    AND dealer.is_enable = 1
                    ${varFilterNoOfDays}
                GROUP BY lms.sales_owner_id`)

                tempConnection.query(mQuery, (err, results, field) => {
                    if (err)
                    {
                        console.log("Connection Erro", err)
                        return false;
                    }
                    else
                    {
                        //console.log(results)
                        if (results.length)
                        {
                            results.forEach(element => {

                                var lead_data = {
                                    salesOwnerId: (element.sales_owner_id) ? (element.sales_owner_id) : "",
                                    name: (element.name) ? (element.name) : "",
                                    totalLeads: (element.countLeads) ? (element.countLeads) : ""
                                };
                                //leadData.push(lead_data)
                                waMsg.push(`${element.name}: ${element.countLeads} Leads`)

                            });

                            let lead_res = {success: true, data: waMsg.join(', '), message: "Lead details found"}
                            if(lead_res) {
                                waNotify.sendEscalation(waMsg.join(', ')).then((escalatioRes) => {
                                    console.log("Escalation WhatsApp Triggered")
                                })
                            }
                            return lead_res;
                        }
                        else
                        {
                            console.log("Response data - No leads found")
                            return false;
                        }
                    }
                })


                tempConnection.release();
            }

        });
    }
    catch (e)
    {
        console.log("Response data - Unable to fetch leads")
        return;
    }


}

//postman api endpoint for testing only
//http://localhost:4547/api/cronescalation/escalationsummary
//https://lgs-admin-api-dev.rpsapi.in/admin/lms/add_app_usage_logs
router.post('/escalationsummary', async (req, res, next) => {
    let summary = await sendEscalationMessage(req.body);
    res.send({success: true, data: summary})
    res.end()
})

//Site survey Reminder CRON
cron.schedule("30 17 * * *", function (funcout) {
    try {
        connection.getConnection((connectionErr,tempConnection)=> { 
            if(connectionErr) {
                console.log("Connection Error, LSQ Buffer Table Process")
            } else {                
                var groupSchedulers = `SELECT DISTINCT scheduler_id,dealer.email,dealer.name, dealer.phone FROM site_survey_detail left join dealer_details dealer on dealer.dealer_id=scheduler_id WHERE (DATE_FORMAT(schedule_date,'%Y-%m-%d') IN (CURDATE() + INTERVAL 1 DAY, CURDATE()) OR DATE_FORMAT(reschedule_date,'%Y-%m-%d') IN (CURDATE() + INTERVAL 1 DAY, CURDATE())) AND status NOT IN ('on_hold', 'completed', 'cancelled')`;
                tempConnection.query(groupSchedulers, (err, sRows, field) => {
                    if(err) {
                        console.log("Select Error", err)
                    } else {
                        if(sRows.length) {
                            sRows.forEach(async sId => {
                                var getSSuvery = "";
                                var todaySSDeails = []
                                var nextSSDetails = []
                                var allSSDetails = []
                                getSSuvery += mysql.format(`SELECT s.*,lms.firstname,lms.phone,lms.city,lms.state,lms.sales_owner_id, lms.pincode,DATE_FORMAT(s.schedule_date, '%Y-%m-%d') as schedule_datec,DATE_FORMAT(s.reschedule_date, '%Y-%m-%d') as reschedule_datec, dealer.email FROM site_survey_detail s LEFT JOIN dealer_details dealer ON dealer.dealer_id = s.scheduler_id LEFT JOIN lms_leads lms ON lms.homeowner_id=s.homeowner_id WHERE (DATE_FORMAT(schedule_date,'%Y-%m-%d') = CURDATE() OR DATE_FORMAT(reschedule_date,'%Y-%m-%d') = CURDATE()) AND status NOT IN ('on_hold', 'completed', 'cancelled') AND scheduler_id=${sId.scheduler_id};`);
                                getSSuvery += mysql.format(`SELECT s.*,lms.firstname,lms.phone,lms.city,lms.state,lms.sales_owner_id, lms.pincode,DATE_FORMAT(s.schedule_date, '%Y-%m-%d') as schedule_datec,DATE_FORMAT(s.reschedule_date, '%Y-%m-%d') as reschedule_datec, dealer.email FROM site_survey_detail s LEFT JOIN dealer_details dealer ON dealer.dealer_id = s.scheduler_id LEFT JOIN lms_leads lms ON lms.homeowner_id=s.homeowner_id WHERE (DATE_FORMAT(schedule_date,'%Y-%m-%d') = CURDATE() + INTERVAL 1 DAY OR DATE_FORMAT(reschedule_date,'%Y-%m-%d') = CURDATE() + INTERVAL 1 DAY) AND status NOT IN ('on_hold', 'completed', 'cancelled') AND scheduler_id=${sId.scheduler_id};`);

                             
                                tempConnection.query(getSSuvery, (err, rows, field) => {                  
                                    if(err) {
                                        console.log("Fetch Error", err)
                                    } else {
                                        if(rows.length) {
                                            var today = moment().format("YYYY-M-DD")
                                            var tomorrow  = moment().add(1,'days').format("YYYY-M-DD");
                                            console.log(today, tomorrow)
                                            //console.log(rows[0])

                                            rows[0].forEach(async element => {
                                                todaySSDeails.push({
                                                    "Homeowner_Id": element.homeowner_id,
                                                    "Name": element.firstname,
                                                    "Phone": element.phone,
                                                    "City": element.city,
                                                    "State": element.state,
                                                    "Pincode": element.pincode,
                                                    "Scheduled_Date": (element.reschedule_datec) ? element.reschedule_datec: element.schedule_datec,
                                                    "Scheduled_Time": element.schedule_time,
                                                    "RM": element.sales_owner_id,
                                                    "leadowner": element.scheduler_id
                                                })                                                        
                                            })

                                            rows[1].forEach(async element => {
                                                nextSSDetails.push({
                                                    "Homeowner_Id": element.homeowner_id,
                                                    "Name": element.firstname,
                                                    "Phone": element.phone,
                                                    "City": element.city,
                                                    "State": element.state,
                                                    "Pincode": element.pincode,
                                                    "Scheduled_Date": (element.reschedule_datec) ? element.reschedule_datec: element.schedule_datec,
                                                    "Scheduled_Time": element.schedule_time,
                                                    "RM": element.sales_owner_id,
                                                    "leadowner": element.scheduler_id
                                                })                                                        
                                            })
                                            
                                            //conver the data to CSV with the column names
                                            if(todaySSDeails.length) {
                                                var todayCsv = jsoncsv.parse(todaySSDeails, ["Homeowner_Id","Name", "Phone", "City", "State", "Pincode", "Scheduled_Date", "Scheduled_Time"]);
                                            } else {
                                                var todayCsv = jsoncsv.parse([{"SiteSurvey": "Not Scheduled"}], ["SiteSurvey"]);
                                            }

                                            if(nextSSDetails.length) {
                                                var tomorrowCsv = jsoncsv.parse(nextSSDetails, ["Homeowner_Id","Name", "Phone", "City", "State", "Pincode", "Scheduled_Date", "Scheduled_Time"]);
                                            } else {
                                                var tomorrowCsv = jsoncsv.parse([{"SiteSurvey": "Not Scheduled"}], ["SiteSurvey"]);
                                            }

                                            // // console.log("Today CSV", todayCsv)
                                            // console.log("Today SS", todaySSDeails)
                                            // console.log("Tomorrow SS", nextSSDetails)
                                            
                                            let mail_data = {
                                                to : sId.email,
                                                sentToId : sId.scheduler_id,
                                                sentToType : 3,                                               
                                                ccEmails: config.ccEmails,
                                                code: "site_survey_reminder",
                                                subject : `Site Survey Scheduled List- ${today} - ${tomorrow}`,
                                                content : "<p>Hi, Please find the attached list of site surveys that you have scheduled for today & tomorrow</p>",
                                                attachments : [
                                                    {
                                                      filename: `${today}-site-surveys.csv`,
                                                      content: todayCsv,
                                                    },
                                                    {
                                                        filename: `${tomorrow}-site-surveys.csv`,
                                                        content: tomorrowCsv,
                                                      },
                                                  ]
                                            }
                                            //let emRes = email.sendEmail(mail_data);

                                            /**** Save Survey Schedule CSV into a folder on Server ****/
                                            var finalCsvData = "";
                                            if(nextSSDetails.length) {
                                                var combineData  = [...todaySSDeails, ...nextSSDetails];
                                                var finalCsvData = jsoncsv.parse(combineData, ["Homeowner_Id","Name", "Phone", "City", "State", "Pincode", "Scheduled_Date", "Scheduled_Time"]);
                                            } else if(todaySSDeails.length) {
                                                var finalCsvData = jsoncsv.parse(todaySSDeails, ["Homeowner_Id","Name", "Phone", "City", "State", "Pincode", "Scheduled_Date", "Scheduled_Time"]);
                                            }

                                            if (finalCsvData != "")
                                            {
                                                let todayData = {filename: `${today}-site-surveys.csv`, data: finalCsvData}
                                                processSurveyFile(todayData).then((resultPath) => {
                                                    console.log("File saved at:", resultPath);
                                                    let sendReminder = {file: resultPath, filename: `${today}-site-surveys.csv`, name: sId.name, phone: sId.phone, dates: `${today} & ${tomorrow}`}
                                                    waNotify.WASiteSurveyReminder(sendReminder).then((ssReminderRes) => {
                                                        console.log("Site Survey Reminder WhatsApp Triggered")
                                                    })
                                                }).catch((error) => {
                                                    console.log("Error:", error.message);
                                                });
                                            }
                                        }
                                    }                    
                                })
                            })
                        } else {
                            console.log("No site survey scheduled")
                        }
                        console.log(sRows)
                    }
                })                
            }
        })
    } catch (e) {
        console.log(e)
    }
})

async function processSurveyFile(params) {
    try {
        // Validate input parameters
        if (!params.filename || !params.data || params.data === "") {
            console.log("Invalid parameters: filename & data are required.");
        }

        const resultFilePath = path.join(appRoot, 'public/documents', params.filename);
        const resultFileUrl =  `${config.baseUrl}/documents/${params.filename}`;
        const dataToWrite = Array.isArray(params.data) ? params.data.join('\r\n') : params.data;

        await fsp.writeFile(resultFilePath, dataToWrite + '\r\n', { flag: 'w+' });
        return resultFileUrl;
    } catch (error) {
        console.log("Error saving file:", error.message);
    }
}

async function sendEscalationSummaryToRM(reqBodyParams)
{

//    console.log("rm_id", reqBodyParams.rm_id);
//    console.log("status", reqBodyParams.status);
//    console.log("leadAging", reqBodyParams.leadAging);
//    return;

    var leadData = [];

    try
    {
        connection.getConnection((connectionErr, tempConnection) => {
            if (connectionErr)
            {
                console.log("Connection Erro", connectionErr)
                return false;
            }
            else
            {

                rm_id = (reqBodyParams.rm_id) ? reqBodyParams.rm_id : "all";
                status = (reqBodyParams.status) ? reqBodyParams.status : "all";
                filterNoOfDays = (reqBodyParams.leadAging) ? reqBodyParams.leadAging : "all";

                varFilterRM = "";
                varFilterStatus = "";
                var varFilterNoOfDays = "";


                if (rm_id != "all")
                {
                    varFilterRM = `  dealer.dealer_id = '${rm_id}'  `;

                }
                else
                {
                    varFilterRM = " 1  ";
                }

                if (status != "all")
                {
                    varFilterStatus = ` AND lms.lead_status = '${status}' `;
                }
                else
                {
                    varFilterStatus = ` AND lms.lead_status IN ('new_lead' , 'ss_pending', 'ss_completed')`;
                }

                if (filterNoOfDays == "all")
                {
                    varFilterNoOfDays = '';
                }
                else
                {
                    varFilterNoOfDays = `AND lms.updated_at <  NOW() - INTERVAL ${filterNoOfDays} DAY`;
                }



                mQuery = mysql.format(`SELECT
                                    DISTINCT lms.sales_owner_id
                
                                    FROM
                                        lms_leads AS lms

                                    LEFT JOIN dealer_details dealer ON
                                        dealer.dealer_id = lms.sales_owner_id

                                    LEFT JOIN dealer_details dealer2 ON
                                        dealer2.dealer_id = lms.lead_owner    

                                    WHERE
                                        ${varFilterRM}
                                        ${varFilterStatus}
                                        AND sales_owner_id != ''
                                        AND lms.active = 1
                                        AND dealer.occupation = 'RM'
                                        AND dealer.is_enable = 1
                                        ${varFilterNoOfDays}`);


//                console.log("qry", mQuery);

                tempConnection.query(mQuery, (err, resultsUniqueSalesOwnerID, field) => {
                    if (err)
                    {
                        console.log("mQuery error occured", err)
                        return false
                    }
                    else
                    {
                        let uniqueSalesOwnerID = []

                        resultsUniqueSalesOwnerID.forEach(function (rowSalesOwnerID)
                        {
                            let valSalesOwnerID = rowSalesOwnerID.sales_owner_id;
                            var valRegionalManager = null;


                            mQueryInnerWait = mysql.format(` SELECT SLEEP(0.3);`);
                            tempConnection.query(mQueryInnerWait, (errorWait, resultsQueryWait, fieldWait) => {
                                if (errorWait)
                                {
                                    console.log("mQueryInnerWait Error occured", errorWait)
                                    return false
                                }
                                else
                                {
                                    //wait for 0.3 sec, 
                                    //To make sure, outlook server concurrent connection exhaution, issue, doesn't occure
                                }
                            });

                            mQueryInner = mysql.format(`SELECT 
                                lms.firstname,
                                lms.phone,
                                lms.email,
                                lms.state,
                                lms.city,
                                lms.address_1,
                                lms.address_2,
                                dealer.name AS rmname,
                                dealer.email AS rmemail,
                                dealerDetailsLead.name AS leadownername,
                                dealerDetailsLead.email AS leadowneremail,
                                dealerDetailsLead.phone AS leadownerphone,
                                lms.lead_status,
                                lms.updated_at AS lead_updated
                            FROM
                                lms_leads lms
                                    LEFT JOIN
                                dealer_details dealer ON dealer.dealer_id = lms.sales_owner_id
                                    LEFT JOIN
                                dealer_details dealerDetailsLead ON dealerDetailsLead.dealer_id = lms.lead_owner
                            WHERE
                                lms.sales_owner_id =  '${valSalesOwnerID}'  
                                ${varFilterStatus}
                                AND sales_owner_id != ''
                                AND lms.active = 1
                                AND dealer.occupation = 'RM'
                                AND dealer.is_enable = 1
                                ${varFilterNoOfDays}`)

//                                console.log(mQueryInner);


                            tempConnection.query(mQueryInner, (errorInner, resultsLmsLeads, field) => {
                                if (errorInner)
                                {
                                    console.log("mQueryInner error occurred", errorInner)
                                    return false
                                }
                                else
                                {
                                    let aryLmsLeads = [];

                                    resultsLmsLeads.forEach(async rowLsmLeadData => {

                                        valRegionalManager = rowLsmLeadData.rmname;
                                        valRegionalManagerEmail = rowLsmLeadData.rmemail;

                                        aryLmsLeads.push({
                                            "Customer_Name": rowLsmLeadData.firstname,
                                            "Customer_Phone": rowLsmLeadData.phone,
                                            "Customer_Email": rowLsmLeadData.email,
                                            "Customer_State": rowLsmLeadData.state,
                                            "Customer_City": rowLsmLeadData.city,
                                            "Customer_Address1": rowLsmLeadData.address_1,
                                            "Customer_Address2": rowLsmLeadData.address_2,
                                            "Lead_Owner_Name": rowLsmLeadData.leadownername,
                                            "Lead_Owner_Phone": rowLsmLeadData.leadownerphone,
                                            "RM_Name": rowLsmLeadData.rmname,
                                            "RM_Email": rowLsmLeadData.rmemail,
                                            "Current_LivSol_Status": rowLsmLeadData.lead_status,
                                            "Lead_Last_Updated_At": moment(rowLsmLeadData.lead_updated).format("YYYY-M-DD")
                                        })
                                    })
                                    //console.log(aryLmsLeads)


                                    config.ccEmails = ['test@yopmail.com'];

                                    if (aryLmsLeads.length)
                                    {
                                        var today = moment().format("YYYY-M-DD")

                                        var leadList = jsoncsv.parse(aryLmsLeads, [
                                            "Customer_Name",
                                            "Customer_Phone",
                                            "Customer_Email",
                                            "Customer_State",
                                            "Customer_City",
                                            "Customer_Address1",
                                            "Customer_Address2",
                                            "Lead_Owner_Name",
                                            "Lead_Owner_Phone",
                                            "RM_Name",
                                            "RM_Email",
                                            "Current_LivSol_Status",
                                            "Lead_Last_Updated_At"
                                        ]);

                                        let mail_data = {
                                            to: ['test@yopmail.com'],
                                            sentToId: valSalesOwnerID,
                                            sentToType: 3,
                                            //ccEmails: allCCEmails,
                                            code: "Escalation_Lead_Dump",
                                            priority: 'high', // Set priority to high
                                            subject: `Action Required: Pending Leads Beyond TAT`,
                                            content: `<p>Dear ${valRegionalManager},</p>
                                                            <p>Please find attached the list of leads that have exceeded the given TAT without any action being taken. We kindly request you to review these leads and take the necessary actions at the earliest.</p>
                                                            <p>Thank you for your prompt attention to this matter.</p>
                                                            <p>Best regards</p>
                                                            <p><br><br>**This is a system generated mail. Please do not reply to it</p>
                                                           `,
                                            attachments: [
                                                {
                                                    filename: `${today}_${valRegionalManager}_leads.csv`,
                                                    content: leadList,
                                                }
                                            ]
                                        };
//                                      console.log(mail_data)
                                        let emRes = email.sendEmail(mail_data);
                                    }
                                    else
                                    {
                                        console.log("Data is missing or invalid")
                                        return false
                                    }
                                }
                            });
                        });
                    
                     console.log("LivSol 360 Lead Dump file has been sent")
                     return true
                 }
                });

                tempConnection.release();
            }
        });
    }
    catch (e)
    {
        console.log("Unable to fetch leads")
        return false
    }
}

function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}

cron.schedule("00 08 * * *", async function () {
   console.log("Sending follow up reminder to Lead Owners in Morning")
   await sendFollowUpReminder();
})

// cron.schedule("30 12 * * *", async function () {
//    console.log("Sending follow up reminder to Lead Owners in  After Noon")
//    await sendFollowUpReminder();
// })

// cron.schedule("30 17 * * *", async function () {
//    console.log("Sending follow up reminder to Lead Owners in Evening")
//    await sendFollowUpReminder();
// })

async function sendFollowUpReminder() {
    try {
        connection.getConnection(async (connectionErr,tempConnection)=> {
            if(connectionErr)
            {
                console.log("Connection Error, fetch leads follow up data", connectionErr)
            }
            else {
                let mQuery = ""; // AND DATE_FORMAT(followup.followup_date, '%H:%i') = DATE_FORMAT(ADDTIME(CURTIME(), '00:30:00'), '%H:%i')
                mQuery = mysql.format(`SELECT DATE_FORMAT(followup.followup_date, '%d-%m-%Y') AS followup_date, DATE_FORMAT(followup.followup_date, '%H-%i-%s') AS followup_time, leads.homeowner_id, leads.firstname, leads.phone, leads.city, leads.state, leads.pincode, leads.lead_owner, owner.name AS owner_name, owner.phone AS owner_phone, owner.email AS owner_email, rm.name AS rm_name FROM lead_followup AS followup LEFT JOIN lms_leads AS leads ON followup.homeowner_id = leads.homeowner_id LEFT JOIN dealer_details AS owner ON leads.lead_owner = owner.dealer_id LEFT JOIN dealer_details AS rm ON leads.sales_owner_id = rm.dealer_id WHERE DATE_FORMAT(followup.followup_date, '%Y-%m-%d') = CURDATE() AND leads.lead_owner != "" AND leads.lead_owner IS NOT NULL AND owner.phone != "" AND owner.phone IS NOT NULL AND leads.active=1 ORDER BY followup.followup_id DESC`);
                tempConnection.query(mQuery, async (error, leadsData) => {
                    tempConnection.release();
                    if(error)
                    {
                        console.log("There is a problem while finding leads follow up data.")
                    } else {
                        if(leadsData.length > 0)
                        {
                            var ownersData = []; var leadOwners = []; var num = 0;
                            leadsData.forEach(async element => {
                                if (!ownersData[element.lead_owner]) {
                                    ownersData[element.lead_owner] = [];
                                    leadOwners[num] = [];
                                    leadOwners[num].push(element.lead_owner);
                                    num++;
                                }
                                ownersData[element.lead_owner].push(element);
                            });

                            if (leadOwners.length > 0) {
                                for (var index = 0; index < leadOwners.length; index++) {
                                    var allFollowUpData = [];
                                    var lead_owner_id = leadOwners[index];
                                    if (ownersData[lead_owner_id]) {
                                        var lead_owner_name = ownersData[lead_owner_id][0].owner_name ?? "";
                                        var lead_owner_phone = ownersData[lead_owner_id][0].owner_phone ?? "";
                                        ownersData[lead_owner_id].forEach(async element => {
                                            allFollowUpData.push({
                                                "Homeowner_Id": element.homeowner_id,
                                                "Customer_Name": element.firstname,
                                                "Customer_Mobile": element.phone,
                                                "City" : (element.city) ? element.city : "",
                                                "State" : (element.state) ? element.state : "",
                                                "Pincode" : (element.pincode) ? element.pincode : "",
                                                "Scheduled_Date": element.followup_date,
                                                "Scheduled_Time": element.followup_time,
                                                "RM": element.rm_name,
                                            });
                                        });
                                        console.log("followup data ", allFollowUpData);
                                        var followups = jsoncsv.parse(allFollowUpData, ["Homeowner_Id","Customer_Name", "Customer_Mobile", "City", "State", "Pincode", "Scheduled_Date", "Scheduled_Time", "RM"]);
                                        if ( followups != "" && lead_owner_phone != "" ) {
                                            var today = moment().format('YYYY-MM-DD');
                                            let todayFollowUpData = {filename: `${today}_livsol_followups.csv`, data: followups}
                                            processSurveyFile(todayFollowUpData).then((resultPath) => {
                                                let sendReminder = {file: resultPath, filename: `${today}_livsol_followups.csv`, name: lead_owner_name, phone: `91${lead_owner_phone}`}
                                                waNotify.sendLeadFollowUpReminder(sendReminder).then((ssReminderRes) => {
                                                    console.log("WA Follow Up Reminder Notification Sent")
                                                })
                                            }).catch((error) => {
                                                console.log("Error:", error.message);
                                            });
                                            await delay(500);
                                        } else {
                                            await delay(500);
                                            console.log("Phone No. not found to send WA follow up reminder");
                                        }
                                    }
                                }
                            }
                        } else {
                            console.log("No data found to send WA follow up reminder")
                        }
                    }
                })
                return;
            }
        })
    } catch (e) {
        console.log("There are some problem in follow up reminder cron", e)
    }
}

module.exports = router;