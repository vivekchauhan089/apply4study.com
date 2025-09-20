import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import Loader from '../Loader';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Payment_summary() {
	const navigate=useNavigate();
	const [result  , setResult]=useState([]);
	const [loading , setLoader]=useState(false);

	const investor=base64_decode( localStorage.getItem('investor_detail'));
	const token = localStorage.getItem("token")?localStorage.getItem("token"):'';
	const investor_detail=JSON.parse(investor);
	const mobile=investor_detail.investor_details?.[0].mobile_no;
	const [plandata, setPlanData]=useState([]);

    useEffect(()=>{
    
		setLoader(true);
		var raw =  {"token":token,"jobType":"investment_details", "mobile_no":mobile}
        var requestOptions = {
			method: 'POST',
			headers: {
            'Content-Type': 'application/json'
			},
			body: JSON.stringify(raw),
        };
		
		fetch("http://localhost/investor_api/index.php/InvestorApis", requestOptions)
         .then(response => response.text())
         .then((result) =>{
            setLoader(false);
            const res=JSON.parse(result)
            setResult(res);
        })
            
         .catch(error => console.log('error', error));
		 
		 var raw = { "token": "msl2n2bthl", "jobType": "plan_list", "product_type": "ALL" }

		var requestOptions = {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(raw),

		};

		fetch("http://localhost/investor_api/index.php/InvestorApis", requestOptions)
		  .then(response => response.text())
		  .then((result) => {
			
			const res = JSON.parse(result);
			for( const [key, value] of Object.entries(res.plan_details) ){
			  let planstr = value.title.replace('-','');
			  planstr = planstr.toLowerCase();
			  plandata[planstr] = value;
			}
			setPlanData(plandata);
					
		  })
		  .catch(error => console.log('error', error));
      
    },[])
	
	function viewpayment(unique_id)
	{
		window.scrollTo(0, 0);
		setLoader(true);
		var raw =  {"token":token,"jobType":"investment_details","invest_id":unique_id}
		var requestOptions = {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(raw),
		};
		
		fetch("http://localhost/investor_api/index.php/InvestorApis", requestOptions)
		 .then(response => response.text())
		 .then((result) =>{
			
			setLoader(false);
			const res=JSON.parse(result)
			
			let planstr = res[0]?.plan.replace('-','');
			planstr = planstr.toLowerCase();

			var plan = plandata[planstr];

			var amount = parseFloat(plan?.amount) || "0";
			var irr = parseFloat(plan?.return_rate)  || "0";
			var gst = parseFloat(plan?.gst) || "0";
			var tenure = parseFloat(plan?.tenure)|| "0";
			var rate = parseFloat(plan?.rate)|| "0";
			var resale = parseFloat(plan?.resale_rate)|| "0";
			var p_percent = (parseFloat(plan?.last_emi_add_percentage) / 100)|| "0";

			const price = res[0]?.qty * amount || "0";
			const basicAmount = Math.round((price / (1 + gst / 100))).toFixed(0) || "0";
			const totalGstAmount = price * (gst / 100)|| "0";
			const payout = (rate / 100) * basicAmount || "0";
			const gstAmount = Math.round(payout * (gst / 100)).toFixed(0)|| "0";
			const emi = Math.round(payout + parseFloat(gstAmount))||"0";
			
			const total = Math.round((emi * tenure) + (price * (resale / 100)))||"0";
			const earn = Math.round(total - price)||"0";
  
			const cartArray = {
			  "order_id": unique_id,
			  "price": price,
			  "earn": earn,
			  "gst": gst,
			  "number": res[0]?.qty,
			  "title": res[0]?.plan,
			  "basicAmount": basicAmount,
			  "gstamount": gstAmount,
			  "value": res.qty,
			  "irr": irr
			}
			window.localStorage.setItem("cartArray", JSON.stringify(cartArray));
			window.location.href = "/payment_detail";
			return false;
		});		
	}
	
	return (
    <div>

    <h4>Payment Summary</h4>

&nbsp;&nbsp;
{!loading ?<>
<div class="table-responsive">
<table class="table table-bordered table-hover">
      
      <thead style={{backgroundColor:"#f47920"}}>
     
       
         
<tr>

<th>Asset Name </th>
<th>Quantity</th>
<th>Amount Invested</th>
<th>Order ID</th>
<th>Order Date</th>
<th>Action</th>

</tr>

</thead>
{result.map((val,index)=>(

        <tbody>
         <tr>
           
            <td>{val.plan}</td>
            <td>{val.qty}</td>
            <td>{val.investment}</td>
            <td>{val.order_id}</td>
            <td>{val.order_date}</td>
            
            <td><a className="btn btn-default"  onClick={()=>{viewpayment(val.order_id)}}>View</a></td>
         </tr>
         </tbody>
              

        ))}
    </table>  
       
</div>
</> :<Loader/>}
    
</div>

  )
}
