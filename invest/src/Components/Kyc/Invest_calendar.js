import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import Loader from '../Loader';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";

export default function Invest_calendar() {
  const [result  , setResult]=useState([]);
  const [loading , setLoader]=useState(false);
	
  const investor=base64_decode( localStorage.getItem('investor_detail'));
  const token = localStorage.getItem("token")?localStorage.getItem("token"):'';
  const investor_detail=JSON.parse(investor);
  const mobile=investor_detail.investor_details?.[0].mobile_no;
  
  const [toggleState, setToggleState] = useState(1);
 
  const [open, setOpen] = React.useState(false);
  
  const [calendarDetail, setCalendarDetail]=useState(null)
  const [calendarData, setCalendarData]=useState([]);
  const [plandata, setPlanData]=useState([]);
  
  useEffect(() => {

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

  }, [])
  
  const handleClose = () => setOpen(false);
  
  const style = {
    position: "absolute",
    top: "42%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    // height: 250,
    textAlign: "center",
    bgcolor: "background.paper",
    p: 0,
    // border: '2px solid #000',
    boxShadow: 24,
	height:"70%",
	overflowY:"auto",
  };
  
  function investorCalendar(mobile,invest_id,tenure=36,invest_emi,invest_date='')
  {	
		var raw =  {"token":token,"jobType":"investment_details","invest_id":invest_id}
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
			
			const res=JSON.parse(result)
			const tableArray = [];
			var i = 0;
			
			let planstr = res[0].plan.replace('-','');
		    planstr = planstr.toLowerCase();
			
			var plan = plandata[planstr];
			var amount = parseFloat(plan?.amount) || "0";
		    var p_percent = (parseFloat(plan?.last_emi_add_percentage) / 100)|| "0";
			
			const price = res[0].qty * amount || "0";
			
			let newDate = new Date(invest_date);
			for (i = 0; i < tenure; i++) {
				let month = newDate.setMonth(newDate.getMonth() + 1);
				let monthString = newDate.toLocaleString('default', { month: 'long' });
				let year = newDate.getFullYear();
				if (i == (tenure - 1)) {
				  tableArray[i] = {
					"no": (i + 1),
					"date": monthString + '-' + year,
					"payment": Math.round(invest_emi + (price * p_percent)).toFixed(0)
				  };
				} else {
				  tableArray[i] = {
					"no": (i + 1),
					"date": monthString + '-' + year,
					"payment": invest_emi
				  };
				}
			}
			
			setCalendarDetail(
    
				<div>

				<h4 style={{marginTop:"10px"}}>My Investment Calendar</h4>

				<div class="table-responsive">
				<table class="table table-bordered table-hover">
					  
					<thead class="table_head" style={{backgroundColor:"#f47920"}}>
						 
						<tr>

						<th>Pmt No.</th>
						<th>Payment Date</th>
						<th>Monthly payout by Mooving</th>
						<th>Payment Status</th>
						
						</tr>

					</thead>
					<tbody>
					{
						tableArray.map((val,index)=>(
							<tr key={val.no}>
								<td>{val.no}</td>
								<td>{val.date}</td>
								<td>{val.payment}</td>
								<td>pending</td>
							</tr>
						))
					}
					</tbody>
					</table>  
						   
					</div>
					
					
				</div>

			);
		
		})
		.catch(error => console.log('error', error));
		
		setOpen(true);
	 
	}
	
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
            for( const [key, value] of Object.entries(res) ){
			  let planstr = value.plan.replace('-','');
			  planstr = planstr.toLowerCase();
			  
			  var plan = plandata[planstr];
			  
			  var amount = parseFloat(plan?.amount) || "0";
			  var gst = parseFloat(plan?.gst) || "0";
			  var tenure = parseFloat(plan?.tenure)|| "0";
			  var rate = parseFloat(plan?.rate)|| "0";
			  var resale = parseFloat(plan?.resale_rate)|| "0";
			  var p_percent = (parseFloat(plan?.last_emi_add_percentage) / 100)|| "0";
			  
			  const price = value.qty * amount || "0";
			  const basicAmount = Math.round((price / (1 + gst / 100))).toFixed(0) || "0";
			  const totalGstAmount = price * (gst / 100)|| "0";
			  const payout = (rate / 100) * basicAmount || "0";
			  const gstAmount = Math.round(payout * (gst / 100)).toFixed(0)|| "0";
			  const emi = Math.round(payout + parseFloat(gstAmount))||"0";
			  
			  const total_amount = Math.round(emi * tenure)||"0";
			  const total_paid_amount = Math.round(emi * parseInt(value.no_submitted_emi))||"0";
			  const total_pending_amount = Math.round(total_amount - total_paid_amount)||"0";
			  
			  res[key].tenure = tenure;
			  res[key].emi = emi;
			  res[key].total_paid_amount = total_paid_amount;
			  res[key].total_pending_amount = total_pending_amount;
			  
			}
			setResult(res);
 
        })
        .catch(error => console.log('error', error));
      
  },[])
	
  return (
    
	<div>

    <h4>Investment Summary</h4>

&nbsp;&nbsp;

{!loading ?<>
<div class="table-responsive">
	
	<table class="table table-bordered table-hover">
      
      <thead style={{backgroundColor:"#f47920"}}>
         
		<tr>

		<th>#</th>
		<th>Asset</th>
		<th>No of Assets</th>
		<th>Amount Invested</th>
		<th>Monthly Return</th>
		<th>Tenure(In months)</th>
		<th>Period Complete</th>
		<th>Amount Paid</th>
		<th>Balance Amount</th>
		<th>Investment Status</th>

		</tr>

	</thead>
	<tbody>
		{result.map((val,index)=>(
			
			<tr>
				<td>{index+1}</td>
				<td>{val.plan}</td>
				<td>{val.qty}</td>
				<td>{val.investment}</td>
				<td>{val.emi}</td>
				<td><a href="javascript:void(0);" onClick={()=>{investorCalendar(mobile,val.order_id,val.tenure,val.emi,val.order_date)}}>{val.tenure}</a></td>
				<td>{val.no_submitted_emi}</td>
				<td>{val.total_paid_amount}</td>
				<td>{val.total_pending_amount}</td>
				<td>{val.status}</td>
			 </tr>
			
			))
		}
	</tbody>	
    </table>  
       
</div>
</> :<Loader/>}

{<><Modal
	aria-labelledby="transition-modal-title"
	aria-describedby="transition-modal-description"
	open={open}
	onClose={handleClose}
	closeAfterTransition
	// BackdropComponent={Backdrop}
	BackdropProps={{
	  timeout: 500,
	}}
	>
	<Fade in={open}>
	  <Box sx={style}>

		  {calendarDetail}

	  </Box>
	</Fade>
  </Modal></>}
    
</div>



  )
}