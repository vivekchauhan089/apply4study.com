import React from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import './sidebar.css';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { useState } from 'react';
export default function Payment() {
  const navigate=useNavigate();
  const [random , setRandom]=useState(null);
  const token = localStorage.getItem("token")?localStorage.getItem("token"):'';
  const [show, hide]=useState(true);
  const cart=localStorage.getItem("cartArray");
//   console.log(JSON.parse(cart)?.[0]);
const cartparse=JSON.parse(cart);
const investor=base64_decode( localStorage.getItem('investor_detail'));

const investor_detail=JSON.parse(investor);
const name=investor_detail.investor_details?.[0].full_name;
const mobile=investor_detail.investor_details?.[0].mobile_no;

useEffect(()=>{
   setRandom(cartparse?.order_id);
})

const apiCall=()=>{
var raw =  {"token":token ,"jobType":"investment_orders" , "order_id":cartparse?.order_id, 
"qty":cartparse?.number , "mobile_no":mobile , "single_price":cartparse?.price ,
 "gst":cartparse?.gst  , "plan":cartparse?.title , "investment":cartparse.price*cartparse?.number }
    
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
        const res=JSON.parse(result);
        if(res.status===200){
			navigate("/agreement");
		}
        else{
			if(res.kyc_status == 'new')
			{
				window.location.href = "/kycnew";
			}else if(res.kyc_status == 'pending'){
				if(window.confirm('Your Kyc is pending.'))
				{ 
					window.location.href = "/kyc";
				}				
			}else{
				alert(res.msg);
			}
        }

     })
     .catch(error => console.log('error', error));

}
  return (
    <div>

     {cart ? <div>
      <div class="box" style={{boxShadow:"none"}}>
   
   <div class="container">
      <div class="row">

        
         <div class="col-md-6" >
            <div class="card " >
               <div class="card-header add-shadow" >
 
                  
                  <div  class="tab-content" > 
{/* 
                  <div class="kyc_status">
    <h4>Payment Status : <span>Approved</span></h4>
</div> */}
<div class="kyc_status">
    <h4 style={{fontWeight:"700"}}>Payment Detail {/*<span  style={{backgroundColor:"orange"}}>Pending</span>*/}</h4>
    
</div>
<p className="text-muted">Order id : {random}</p>
<p className="text-muted">Your payment has not been processed yet.</p>

<div class="table-responsive">
              
              <table class="table">
                 
                 <tbody>
                   
                    <tr>
                       <td> From</td>
                       <th id="subtotal_val" style={{textTransform:"uppercase"}}>{name}</th>
                    </tr>
                    <tr>
                       <td> To </td>
                       <th id="discount_val">MOOVING</th>
                    </tr>
                    <tr>
                       <td>Basic Amount</td>
                       <th>₹ {parseInt(cartparse?.basicAmount).toLocaleString()}</th>
                    </tr>
                    <tr>
                       <td>GST Amount</td>
                       <th>₹ {parseInt(cartparse?.gstamount).toLocaleString()}</th>
                    </tr>
                    <tr style={{backgroundColor:"#eee"}}>
                    
                    
                       <td>Total Investment</td>
                       <th>₹ {cartparse.price? cartparse.price.toLocaleString() : 0}</th>
                    </tr>
                   
                   
                 </tbody>
                 
              </table>
             </div>
{/* <button className=' success-btn mt-3 mb-3' style={{float:"left", fontWeight:"600", border:"1px solid #eee" , color:"#101010" , backgroundColor:"transparent" }}>Download Invoice<i className='fa fa-download'></i></button> */}
           
                 
             
                     <br/>
                     <p>
                        {/* <a class="subscribe btn btn-primary btn-block shadow-sm btn-default"
<b>Notice</b>:  Undefined variable: customer_id in <b>/var/www/html/mooving_invest/pay_offline.php</b> on line <b>163</b><br />
">Click here to pay offline</a> */}
                     </p>
                  
                  
               </div>
            </div>
         </div>
      </div>
      <div class="col-md-6">
         <div class="add-shadow" id="order-summary">
           
         <div class="box-header">
            
               <h3>Plan Summary</h3>
            </div>
           
            <p class="text-muted">
               Shipping and additional costs are calculated based on the values you have entered.
            </p>
            <div class="table-responsive">
              
               <table class="table">
                 
                  <tbody>
                  <tr>
                        <td>Product Name </td>
                        <th id="subtotal_val">{cartparse.title?cartparse.title :""}</th>
                 </tr>
                     
                 <tr>
                    <td>Number of Products </td>
                        <th id="subtotal_val">{cartparse.number ? cartparse.number:""}</th>
                 </tr>
                     
                     
                     <tr>
                        <td>Single product rate</td>
                        <th id="subtotal_val"> ₹ {cartparse.price? cartparse.price.toLocaleString():""} </th>
                     </tr>
                     <tr>
                        <td>Tenure</td>
                        <th id="subtotal_val"> 3 Years </th>
                     </tr>
                     <tr>
                        <td>Total installments</td>
                        <th id="subtotal_val">36 </th>
                     </tr>
                     <tr>
                        <td>Earn </td>
                        <th id="subtotal_val"> ₹ {cartparse.earn? cartparse.earn.toLocaleString():""} </th>
                     </tr>
                   
                     <tr>
                        <td>IRR</td>
                        <th id="subtotal_val">{cartparse.irr? cartparse.irr:""}</th>
                     </tr>

                     {/* <tr>
                        <td>Pre Tax Returns</td>
                        <th id="subtotal_val">   </th>
                     </tr> */}
                    
                     {/* <tr>
                        <td> Discount </td>
                        <th id="discount_val"> ₹0.00 </th>
                     </tr> */}
                    
                     <tr>
                        <td>GST</td>
                        <th>{cartparse.gst}%</th>
                     </tr>
                     <tr>
                        <td> Total Investment </td>
                        <th id="subtotal_val"> ₹ {cartparse.price ? cartparse.price.toLocaleString():""} </th>
                     </tr>
                     {/* <tr class="total" style={{backgroundColor:"#eeeeee"}}>
                        <td>Total</td>
                        <th id="finalamt_val">₹78500.00</th>
                     </tr> */}
                  </tbody>
                  
               </table>
              <button type="button" className='btn btn-default' onClick={apiCall}>Proceed</button> 
            </div> 
            
     
   </div>
</div>
</div>
</div>



            </div> </div> :<div>  <a className="btn btn-default"  onClick={()=>{navigate("/")}}>View Deals</a>   </div> }
    </div>
  )
}
