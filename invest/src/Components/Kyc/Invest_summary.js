import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import Loader from '../Loader';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

export default function Invest_summary() {
	const [result  , setResult]=useState([]);
	const [loading , setLoader]=useState(false);

	const investor=base64_decode( localStorage.getItem('investor_detail'));
	const token = localStorage.getItem("token")?localStorage.getItem("token"):'';
	const investor_detail=JSON.parse(investor);
	const mobile=investor_detail.investor_details?.[0].mobile_no;

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
      
    },[])
  return (
    <div>

    <h4>My Investments</h4>
<p class=""> Your Investments on one place.</p>
<p class="">
   If you have any questions, please feel free to <a > contact us,</a> our customer service center is working for you 24/7.
</p>


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
<th>No. of EMIs completed</th>

<th>Payment Status</th>
{/*<td align="right">{val.payout}</td>
<td align="right">{val.gst}</td>
<td>{val.payment}</td>
<td>{val.payout}</td>
*/}

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
            <td>{val.no_submitted_emi}</td>
          
            <td>{val.status}</td>
         </tr>
         </tbody>
              

        ))}
    </table>  
     

{/* //          <tr>
          
//             <th>1</th>
//             <td>1,20,000</td>
//             <td>8%</td>
//             <td>5 Years</td>
//             <td>2 years</td>
//             <td>45,000</td>
//          </tr>
     

//       </tbody> */}


  
</div>
</> :<Loader/>}


{/* <div>
   <h4>Return on Investment</h4>
   <div class="table-responsive">
      <table class="table table-bordered table-hover">
        
         <thead style={{backgroundColor:"#f47920"}}>
            
            <tr>
               <th>#</th>
               <th>Principle Amount</th>
               <th>Rate of interest</th>
               <th>Principle paid</th>
               <th>Interest Paid</th>
               <th>EMI</th>
            </tr>
         </thead>
       
         <tbody>
         

            <tr>
              
               <th>1</th>
               <td>2,10,000</td>
               <td>8%</td>
               <td>95,000</td>
               <td>20,000</td>
               <td>10500</td>
            </tr>
           

         </tbody>
        
      </table>
   </div>
  
</div>            */}
    
</div>

  )
}
