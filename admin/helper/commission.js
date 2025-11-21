let router = require('express').Router();
let APIBody = require('../lib/APIBody');
let BodyCheck = require('../lib/bodyCheck');
let config = require('../config');
let request = require('request');
let connection = require('mysql').createPool(config.database);
let mysql = require('mysql');
let moment = require('moment');
let notify = require('./sendNotification');
let livServUpdate = require('./sendLivservUpdate');

router.post('/create', (req, res, next) => {
    //console.log("Requested By", req.decoded)

    try {
        let companyName = ""
        let body = APIBody.find(e => e.method == 'post' && e.name == 'add_commission');
        
        if(!(BodyCheck.checkBody(req.body,body.body)).success) 
        {
            console.log('parameter not find');
            res.status(200).json({success : false ,message : 'Required parameter is missing'});

        } else {
            
            connection.getConnection((connectionErr,tempConnection)=> {
                
                if(connectionErr) 
                {
                    console.log("Connection Erro", connectionErr)
                    res.send({success: false, message: connectionErr})
                    return;
                }

                if(req.body.homeowner_id == "" || req.body.status == "") 
                {
                    res.send({success: false, message: "Please check the parameters"}) 
                    return; 
                }

                let homeowner_id = req.body.homeowner_id 
                let comments = req.body.comment
                let requestById = req.decoded.dealer_id

                if( req.body.status == "ic" )
                {
                    
                    let mQuery = "";
                    mQuery = mysql.format(`UPDATE lms_leads SET lead_status = ? WHERE homeowner_id = ?;`, [req.body.status,homeowner_id]);
                    mQuery += mysql.format(`SELECT commission_id from leads_commission where homeowner_id=?;`, [homeowner_id]);
                    mQuery += mysql.format(`SELECT name, email from dealer_details where dealer_id=?;`, [req.decoded.dealer_id]);
                    mQuery += mysql.format(`SELECT firstname, lastname, phone, address_1, city, state, pincode from lms_leads where homeowner_id=?;`, [homeowner_id]);

                    tempConnection.query( mQuery, (err, upResult, field) => {

                        let requestByName = upResult[2][0].name
                        let requestByEmail = upResult[2][0].email
                        let purchase_date = new Date(req.body.purchase_date);
                        
                        if(upResult[1].length > 0 || upResult[2].length == 0 || upResult[3].length == 0) 
                        {
                            res.send({success: false, message: "Requested commission is already exists for this Lead."})
                            res.end()
                            return false;
                        }

                        const reqDetails = {
                            "first_name": upResult[3][0].firstname,
                            "last_name" : upResult[3][0].lastname ? upResult[3][0].lastname : '',
                            "mobile_no" : upResult[3][0].phone,
                            "address"   : upResult[3][0].address_1,
                            "city"      : upResult[3][0].city,
                            "state"     : upResult[3][0].state,
                            "pincode"   : upResult[3][0].pincode,
                            "serial_no" : req.body.serial_no,
                            "purchase_date" : moment(purchase_date).format("MM/DD/YYYY"),
                        }
                        
                        let postActivity = livServUpdate.createCall(homeowner_id, reqDetails).then((activityRes) => {
                            
                            if( activityRes.success == true && activityRes.service_call_no != '' ) 
                            {
                                let service_call_no = activityRes.service_call_no;
                                let service_call_status = activityRes.status;

                                let insertCommReq = "INSERT INTO leads_commission (homeowner_id, requested_by_id, request_by_name, serial_no, purchase_date, commission_status, service_call_no) values (?)";
                                let commData = [homeowner_id, requestById, requestByName, req.body.serial_no, moment(purchase_date).format("YYYY-MM-DD"), service_call_status, service_call_no];
                                tempConnection.query(insertCommReq,[commData], function (insErr, result) {

                                    if( insErr ) 
                                    {
                                        res.send({success: false, message: "Plese try again later"});
                                        res.end();
                                        return;
                                    }

                                    if(result.insertId) 
                                    {
                                        res.send({success: true, message: "Commission request has been successfully created."})
                                        res.end()
                                        let mailData = {
                                            name: upResult[3][0].firstname,
                                            phone: upResult[3][0].phone,
                                            address: upResult[3][0].address_1,
                                            city: upResult[3][0].city,
                                            state: upResult[3][0].state,
                                            pincode: upResult[3][0].pincode,
                                            serial_no: req.body.serial_no,
                                            service_call_no: service_call_no,
                                            code: "commission-request",
                                            to: "vivek.kumar5@lectrixev.com",
                                            cc: requestByEmail,
                                            details: `Customer Name:${upResult[3][0].firstname}<br>Customer Mobile:${upResult[3][0].phone}<br>Address:${upResult[3][0].address_1}<br>City:${upResult[3][0].city}<br>State:${upResult[3][0].state}<br>Pincode:${upResult[3][0].pincode}<br>Serial No:${req.body.serial_no}<br>Service Call No.:${service_call_no}<br>`
                                        }
                                        
                                        let sendCom = notify.sedReqNotifyEmail(mailData).then((notifyRes) => {
                                            console.log("Email Notification Sent Successfully")
                                        })

                                    }
                                })

                            }  else {
                                res.send({success: false, message: activityRes.msg})
                                res.end();
                                return;
                            }                                      
                        })

                    })
                }
                else {
                    res.send({success: false, message: "Please check the status"});
                    res.end();
                    return;
                }

                tempConnection.release();

            })
        }

    } catch (e) {

        console.log(e)

        res.send({success: false, message: e })
        res.end()
    }

})

router.post('/update', (req, res) => {
    let body = APIBody.find(e => e.method == 'post' && e.name == 'update_commission');
    
    if(!(BodyCheck.checkBody(req.body,body.body)).success)
    {
        console.log('parameter not find');
        res.status(200).json({success : false ,message : 'Required parameter is missing'});
    
    } else {

        try {

            connection.getConnection((connectionErr,tempConnection)=> {
                
                if(connectionErr) 
                {
                    res.send({success: false, message: connectionErr})
                    res.end();
                    return;
                }
                
                if(req.body.serviceCallNo =="" || req.body.data == "" || req.body.source == "") {
                    res.send({success: false, message: "Please check the parameters"}) 
                    return; 
                }

                let mQuery = "";
                mQuery = mysql.format(`SELECT commission_id from leads_commission where service_call_no=?;`, [req.body.serviceCallNo]);
                
                tempConnection.query(mQuery, (error, commData) => {
                    
                    if(error) 
                    {
                        console.log("There is a problem while finding commission data.")
                        res.send({success: false, message: "Plese try again later"});
                        res.end();
                        return;
                    
                    } else {
                        
                        if(commData.length > 0)
                        {     

                            let call_status = req.body.data[0].js_status;
                            let call_remark = req.body.data[0].engineer_remark

                            let insertCommReq = "INSERT INTO commission_crm_logs (service_call_no, data, source, status) values (?)";
                            let commData = [req.body.serviceCallNo, req.body.data, req.body.source, req.body.call_status];
                            
                            tempConnection.query(insertCommReq,[commData], function (insErr, result) {

                                if( insErr ) 
                                {
                                    res.send({success: false, message: "Plese try again later"});
                                    res.end();
                                    return;
                                }

                                if(result.insertId) 
                                {                                               
                                    mQuery = mysql.format(`UPDATE leads_commission SET commission_status=?, comments=? WHERE homeowner_id=?;`, [call_status, call_remark, req.body.serviceCallNo]);
                                    
                                    tempConnection.query(mQuery, function (upsErr, result) {
                                        tempConnection.release()
                                        if(upsErr) 
                                        {
                                            res.send({success: false, message: "Plese try again later", error: upsErr});
                                            res.end();
                                            return;
                                        }
                                        if(result.affectedRows) 
                                        {
                                            res.send({success: true, message: "Commission has been successfully updated"})
                                            res.end();                
                                        } else {
                                            res.send({success: false, message: "There is some problem, Please try again later"})
                                            res.end();  
                                        }
                                    })

                                }
                            })

                        } else {
                            res.send({success: false, message: "No Commission details found."})
                            res.end();                            
                        }
                    }

                })
                tempConnection.release()
            })

        } catch (e) {
            res.send({success: false, message: "Try again later"})
            res.end();
            return;
        }
    }
})

router.post('/synccallstatus', (req, res) => {
    
    try {
        connection.getConnection((connectionErr,tempConnection)=> {
            if(connectionErr) 
            {
                console.log("Connection Error, Commission Table Process", connectionErr)
            }
            else {
            
                let mQuery = "";
                mQuery = mysql.format(`SELECT commission_id, service_call_no FROM leads_commission WHERE service_call_no != '' AND commission_status != '' AND commission_status != 'Closed' ORDER BY commission_id DESC;`);
            
                tempConnection.query(mQuery, (error, commData) => {
                    
                    if(error) 
                    {
                        console.log("There is a problem while finding commission data.")
                    } else {
                        
                        if(commData.length > 0)
                        {     
                            commData.forEach(async element => {

                                let commission_id = element.commission_id;
                                let service_call_no = element.service_call_no;

                                return new Promise((resolve) => {
                                    const options = {
                                        url: config.livServApiUrl,
                                        method: 'POST',
                                        headers: {
                                            'Authorization': config.livServApiKey,
                                            'Accept': 'application/json',
                                        },
                                        json: {
                                            "jobType": "checkJSStatus",
                                            "source": "livsol",
                                            "job_sheet": service_call_no
                                        }
                                    };

                                    request(options, function (apiErr, res, livBody) {
                                        if(apiErr) {
                                            console.log("Unable to call LivServ Service Call API", apiErr)
                                        } else {
                                            resolve(livBody)
                                        }
                                    })

                                }).then((livData) => {
                                    
                                    console.log(livData);
                                    if(livData != '' &&  livData.status != 'fail') 
                                    {
                                        let call_status = livData.data[0].js_status;
                                        let call_remark = livData.data[0].engineer_remark;

                                        mQuery = mysql.format(`UPDATE leads_commission SET commission_status=?, comments=? WHERE commission_id=?;`, [call_status, call_remark, commission_id]);
                                        
                                        tempConnection.query(mQuery, function (upsErr, result) {
                                            if(upsErr)
                                            {
                                                console.log("There is a problem while updating the record in commission table")
                                            }

                                            if(result.affectedRows) 
                                            {
                                                console.log("Updated Commission table", result)
                                            } else {
                                                console.log("There is a problem while updating the record in commission table")
                                            }
                                        })
                                    }
                                    else {
                                        console.log("There is a problem while finding job sheet detail in livserv")
                                    }

                                })

                            })
                            
                        } else {
                            console.log("No request payloads are availble in commission")
                        }
                    }

                })
                tempConnection.release()
            }

        })
        
    } catch (e) {
        console.log("There are some problem in Commission CRON", e)        
    }
    
})

router.post('/fetch', (req, res) => {
    try {
        if(req.body.reqId) {
            connection.getConnection((connectionErr,tempConnection)=> {
                if(connectionErr) {
                    console.log("Connection Erro", connectionErr)
                    res.send({success: false, message: connectionErr})
                    return;
                }
                let mQuery = mysql.format(`SELECT lc.serial_no,lc.service_call_no,lc.commission_status,lc.request_by_name,ls.firstname,ls.lastname,ls.phone,ls.address_1,ls.city,ls.state,ls.pincode from leads_commission lc INNER JOIN lms_leads ls ON lc.homeowner_id = ls.homeowner_id WHERE lc.homeowner_id=?;`, [req.body.reqId])
                tempConnection.query(mQuery,(err,fetchRes,field)=>{
                    if(err) {
                        res.send({success: false, message: "Please try again later", error: err})
                        res.end()
                        return false;
                    }
                    if(fetchRes.length > 0) {
                        //console.log(fetchRes)
                        let sedReqData = fetchRes[0]
                        let sendResponse = {
                            serialNo: sedReqData.serial_no,
                            serviceCallNo: sedReqData.service_call_no,
                            name: sedReqData.name,
                            phone: sedReqData.phone,
                            email: sedReqData.email,
                            pincode: sedReqData.pincode,
                            city: sedReqData.city,
                            state: sedReqData.state,
                            address: sedReqData.address_1,
                        }
                        res.send({success: true, data: sendResponse, message: "Commission request details found"})
                        res.end();
                        return true;
                    } else {
                        res.send({success: false, data: {}, message: "No Commission details found"})
                        res.end();
                    }
                })
                tempConnection.release();  
            })
    
        } else {
            res.send({success: false, data: [], message: "Mandatory field is missing"})
            res.end();
        }
    } catch (e) {
        res.send({success: false, message: e })
        res.end()
    }
})


module.exports = router;