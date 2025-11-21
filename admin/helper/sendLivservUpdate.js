let config = require('../config');
let util = require('util');
let request = require('request');
const { resolve } = require('path');

module.exports.createCall = async function (homeownerId, reqParams) {
	
	return new Promise((resolve) => {

		var sendReq = { 
			"jobType": "callCreationLivSol",
			"source": "livsol",
			"mobile": reqParams.mobile_no,
			"serial_number": reqParams.serial_no,
			"date_of_purchase": reqParams.purchase_date, //date of purchase not less than primary sale date.
			"first_name": reqParams.first_name,
			"last_name": reqParams.last_name ? reqParams.last_name : reqParams.first_name,
			"alt_mobile": "",
			"email_id": "",
			"address": reqParams.address,
			"pincode": reqParams.pincode,
			"area": "",
			"city": reqParams.city,
			"district": reqParams.pincode,
			"state": reqParams.state,
			"cust_type": 3,
			"call_type": 2,
			"remark": reqParams.remark ? reqParams.remark : '',
			"call_origin": "customer",
			"service_location": "customer",
			"voc": "other"
		};
  		
  		const options = {
  		    url: config.livServApiUrl,
  		    headers: {
  		        'Authorization': config.livServApiKey,
  		    },
  		    json: true,
  		    body: sendReq
  		}

  		request.post(options, (error, res, body) => {

  			console.log(body);

  			if(error)
  			{
  			    resolve({success: false, error_msg: error, msg: 'Unable to call LivServ Service Call API.'})
  			}


			if( body != '' && typeof body == 'object' )
			{
				
				if (body.status == 'fail')
				{
					resolve({success: false, error_msg: error, msg: 'There is a problem while creating call in the LivServ.'})
				}

				if ( body.code == 200 ) 
				{
					resolve({success: true, service_call_no: body.data.job_sheet, status: 'Open',  msg: body.message})
				}
				else {
					resolve({success: false, msg: body.message})
				}

			}
			else {
	            resolve({success: false, error_msg: error, msg: 'There is a problem while fetching, Please try again later.'})
	        }

		});

	})
}

