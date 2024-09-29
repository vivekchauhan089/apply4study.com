
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

// import DateRangePicker from 'rsuite/DateRangePicker';
import Table from 'react-bootstrap/Table';
import Footer from "../assets/Footer";
import Header from "../assets/Header";
import DonutChart from 'react-donut-chart';
import Highcharts from 'highcharts';
import { Calendar } from 'react-date-range';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

import HighchartsReact from "highcharts-react-official";

import './dashboard.css';
import Loader from '../Loader';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import Faq from '../assets/Faq';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [startDate, setStartDate] = useState(new Date());
  const [investmentList, setInvestmentList]=useState([]);
   const [endDate, setEndDate] = useState(new Date());
  const [filter , setFilter]=useState("");
  const [toggle , setToggle]=useState("");
  const [toggleInvestorAssetTable,setToggleInvestorAssetTable ] = useState(false);
  const [users , setUser]=useState([]);
  const [leads , setLeads]=useState([]);
  const [investors , setInvestor]=useState([]);
  const [selectUser , setSelect]=useState("");
  const token = localStorage.getItem("token")?localStorage.getItem("token"):'';
  const [urlX, setUrl]=useState();
  const [loading, setLoading] = useState(false);
  let name=localStorage.getItem('investor_detail')?localStorage.getItem('investor_detail'):'';

   const [investQty, setInvestQty] = useState(0);
	
	const navigate=useNavigate();
	
	let investor_detail={"name":"","profile_image":""};	
	if(name!=''){
		let investor=base64_decode(name);
		investor_detail=JSON.parse(investor);
		//console.log(investor_detail.investor_details?.[0].profile_image);
	}

	const toggleTab=(val)=>{
	  setToggle(val);
	  //console.log(val);
	}

	function titleCase(str){
	  return str
		  .split(' ')
		  .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
		  .join(' ');
	}

	const getProfile=({target})=> {
		
		  /*
		if(target.files<1 || target.validity.valid){
		return
		}*/
		var itmName=target.name;
		var imgPath='';
		//console.log(itmName)

		getBase64(target.files[0],(err,result)=>{
		 if(result){
		  var image_name=target.files[0].name;
		  var base64img=result;
		  
		//API Call

		var raw =   {"jobType":"profile_submitted",
		"profile_image": base64img,
		"value":image_name,
		"mobile_no":"9810234567",
		"token":token
		}

		var requestOptions = {
		method: 'POST',
		headers: {
		"access-control-allow-origin" : "*",
		'Content-Type': 'application/json'

		},
		body: JSON.stringify(raw),
		};

		fetch("http://localhost/investor_api/index.php/InvestorApis", requestOptions)
		.then(response => response.text())
		.then((result) =>{
		const res=JSON.parse(result);
		imgPath=res.url;
		//console.log(imgPath)
		urlX[itmName]=imgPath;
		//console.log(res);
		setUrl(urlX)
		investor_detail.profile_image=urlX;
		// console.log(url);
		})

		.catch(error => console.log('error', error));

		// API Call End

			
		 }
		})
	};

	const getBase64 =(file,cb)=> {
	  const reader = new FileReader()
	  reader.readAsDataURL(file)
	  reader.onload=function (){
		  cb(null,reader.result)
	  }
	  reader.onerror=function (err){
		  cb(err,null)
	  }
	};

  const investorDetail=()=>{
    setLoading(true);
    //  setSelect("mark");
    setToggle("investment-details")
     var raw =  {"token":token,"jobType":"investor_datails", "mobile_no":"ALL"}
    
    var requestOptions = {
     
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
     },
     body: JSON.stringify(raw),
 //    redirect: 'follow'
     };
     
   fetch("http://localhost/investor_api/index.php/InvestorApis", requestOptions)
     .then(response => response.text())
     .then((result) =>{
        //console.log(result); 
        setLoading(false);
        let res=JSON.parse(result);
        let index=res.investor_details;
		// console.log(res.investor_details[0].status); 
		 setUser(index);
		//console.log(index);
       
    })
        
     .catch(error => console.log('error', error));
  }
 

   function singleInvestor(mobile)
   {
     setLoading(true);
     var raw =  {"token":token,"jobType":"investor_datails", "mobile_no":mobile}
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
		setLoading(false);
		let res=JSON.parse(result);
		let index=res.investor_details;
		setInvestor(index);
		toggleTab('singleInvestorDetails');
		return false;
	 })        
     .catch(error => console.log('error', error));
  }
  
  function getInvestmentList()
  {
	
	fetch("http://localhost/investor_api/index.php/InvestorApis/mongotest/investment_details")
	 .then(response => response.text())
	 .then((result) =>{
		const res=JSON.parse(result)
		//console.log(res); 
		setInvestmentList(res);
		toggleTab('investor-details');
		return false;

	})		
	 .catch(error => console.log('error', error));	
  }
  
  function newLeads()
  {
     setLoading(true);
     var raw =  {"token":token,"jobType":"new_leads"}
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
		setLoading(false);
		let res=JSON.parse(result);
		let index=res.leads;
		setLeads(index);
		toggleTab('new-leads');
		return false;
	})        
     .catch(error => console.log('error', error));
  }
  
  function titleCase(str) {
	str = str.replace('_', ' ');
	var splitStr = str.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
	}
	return splitStr.join(' '); 
  }

  function investorKycUpdate(mobile,doc_type,action)
  {    
    setLoading(true);
     var raw =  {
		 "token":token,
		 "jobType":"investor_kyc_update", 
		 "mobile_no":mobile,
		 "kyc_doc_type":doc_type,
		 "kyc_action":action
	}
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
      setLoading(false);
	  
		if(action == 'accept') {
			document.getElementById(doc_type).innerHTML = 'Approved';
			alert(titleCase(doc_type)+" is approved.");			
		}else{
			document.getElementById(doc_type).innerHTML = 'Rejected';
			alert(titleCase(doc_type)+" is rejected.");			
		}
    
	})
    .catch(error => console.log('error', error));
  }
  
  function investorEmiUpdate(inv_id,invest_qty)
  {    
	const emi_qty = document.getElementById("invest_qty").value;
	if ( (invest_qty > 0) && (emi_qty > parseInt(invest_qty+1)) )
	{
		alert('Sorry! you can not update more than 1 emi / month');
		return false;
	}	
	
	//setLoading(true);
	
    var raw =  {
		 "token":token,
		 "jobType":"investor_emi_update", 
		 "inv_id":inv_id,
		 "emi_qty":emi_qty
	}
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
		//setLoading(false);		
		let res=JSON.parse(result);
		
		if( res.status == 200 )
		{
			const QtyLabel = () => {
				return (
					<>{emi_qty}
					<i class="fa fa-edit" onClick={()=>{showInvestomentAction(inv_id,emi_qty)}}></i>
					</>
				);
			};
			
			ReactDOM.render(
			  <QtyLabel />,
			  document.getElementById("emiup_" + inv_id)
			);
		} else {
			alert(res.msg);
		}
		return false;
				    
	})
    .catch(error => console.log('error', error));
 }

 function showInvestomentAction(id,qty){
	
	setInvestQty(qty);
	var new_qty = (parseInt(qty)+1);
	
	const QtyBox = (props) => {
		return (
		<div>
			<input name="invest_qty" id="invest_qty" type="number" min={qty} max={new_qty} defaultValue={qty} onChange={e => setInvestQty(e.target.value)} />
			<a onClick={e=>{investorEmiUpdate(id,qty)}}><i class="fa fa-check" ></i></a>
		</div>
		);
	};
	
	ReactDOM.render(
	  <QtyBox />,
	  document.getElementById("emiup_" + id)
	);
		
 }
 
 function logout(){
	
	var raw = {"token":localStorage.getItem("token"),"jobType":"logout"};
	var requestOptions = {
	 //  mode: 'no-cors',
	   method: 'POST',
	   headers: {
		 'Content-Type': 'application/json'
	 },
	 body: JSON.stringify(raw),
 //    redirect: 'follow'
	 };
	 //console.log(raw);
   fetch("http://localhost/investor_api/index.php/InvestorApis", requestOptions)
	 .then(response => response.text())
	 .then(result =>{
	   //console.log(result);
	   localStorage.clear();
	   navigate("/")})

	   .catch(error => console.log('error', error));
	
 }
	
 const handleCellOnClick = () => {
  setToggleInvestorAssetTable(!toggleInvestorAssetTable)
 }
 const chooseOption=(val)=>{setFilter(val);
  //console.log(val);
  }
  const [toggleState , setToggleState]=React.useState(1);
  const [show,setShow]=React.useState(true);
  const switchTab=(index)=>{
     setToggleState(index);
  //console.log(index);
  };
  const style = {
	  position: "absolute",
	  top: "42%",
	  left: "50%",
	  transform: "translate(-50%, -50%)",
	  width: 450,
	  // height: 250,
	  textAlign: "center",
	  bgcolor: "background.paper",
	  // border: '2px solid #000',
	  boxShadow: 24,
	 
	};
    const options1 = {
        colors:[
          'rgb(142, 93, 63)','#eee','#f47920FF'
        ],
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
         
      },
      
    accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
 
  title: {
    text: 'Type of investors'
  },
  plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
    }
  },
  series: [{
    
    colorByPoint: true,
    data: [{
        name: 'individual',
        y: 30
    
    },{
    name: 'company',
    y: 20}
    ,{
        name: 'x',
        y: 60}]
  }]
  
        
      }

      const options2 = {

        colors:[
          '#f4792033','#f4792055','#f4792077','#f4792099','#f47920BB','#f47920FF'
      ],
        title: {
          text: 'Monthwise Investment',
          align:'left',
          style: {
            fontSize: '22px' ,
            fontWeight:'600',
            fontFamily: "Nunito",
            color:"#1010101",
            marginBottom:'10px'
            
         }
        },
        xAxis:{
          categories:['Jan','Feb','Mar','April']
        },
        series: [{
          data: [30,40,60,70],
          name:'Monthwise Investment',
          type:'line'
        }],
        yAxis: {
          
          title: {
              text: 'Percentage'
          }
      },
      plotOptions:{
        series:{colorByPoint:true},
    
      }
      }
      const options3 = {

        chart: {
          type: 'column'
      },
      title: {
          text: 'Month-wise Investor Type',
          align: 'left'
      },
      xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr']
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Count Investor'
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  color: ( // theme
                      Highcharts.defaultOptions.title.style &&
                      Highcharts.defaultOptions.title.style.color
                  ) || 'gray',
                  textOutline: 'none'
              }
          }
      },
      legend: {
          align: 'left',
          x: 70,
          verticalAlign: 'top',
          y: 70,
          floating: true,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
      },
      tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: true
              }
          }
      },
      series: [{
          name: 'Active',
          color: "#f47920FF",
          data: [30, 50, 10, 60]
      }, {
          name: 'KYC Pending',
          color: "#f47920BB",
          data: [140, 80, 80, 120]
      }, {
          name: 'KYC Approved',
          color:'#f4792033',
          data: [0, 20, 40, 30]
      }]
      }
      const options5= {
        chart: {
          type: 'pie',
          options3d: {
              enabled: true,
              alpha: 45
          }
      },
      colors:[
        '#f4792099','#f47920BB','#f47920FF'
    ],
      title: {
          text: 'Typewise Investment'
      },
      subtitle: {
          text: ''
      },
      plotOptions: {
          pie: {
              innerSize: 100,
              depth: 45
          }
      },
      series: [{
          name: 'Investment Product',
          data: [
              ['E-bike', 16],
              ['Livguard 40MH', 12],
              ['Livguard 100MH', 8],
          ]
      }]
      }
  return (
    <div>
         <Header/>
  
  <div style={{backgroundColor:"#f5f5f5"}}>

    <div className="container-fluid p-3">
      <div className="col-md-12"  >
        {/* <div className="alert alert-danger">
          <strong> Warning! </strong> Please Confirm Your Email and if you
          have not received your confirmation email
          <a href="my_account.php?send_email" className="alert-link">
            Send Email Again
          </a>
        </div> */}
      </div>
      <div className="Row">
        <div className="col-md-3">
          <section className="customer-profile">
            <div className="panel panel-default sidebar-menu">
              <div className="panel-heading">
                <div className="customer-image">
                  <div class="avatar-edit">
                      <input type="file"  accept=".png, .jpg, .jpeg" id="imageUpload" name="profile"  onChange={getProfile} />
                      <label for="imageUpload"></label>

                  </div>
                  <div class="avatar-preview">
                    <img src={investor_detail.investor_details?.[0].profile_image!=""? investor_detail.investor_details?.[0].profile_image : "../avatar.png"} className="img-responsive" />
                  </div>
                </div>

                <br />

                <h3 align="center" class="panel-title">
                {investor_detail.investor_details?.[0].full_name!=""? titleCase(investor_detail.investor_details?.[0].full_name) : "Name Here"}
                </h3>
              </div>
              {/* <!-- panel-heading Ends --> */}
              <div class="side-bar category category-md">
                {/* <!-- panel-body Starts --> */}
                <ul >
                  {/* <!-- nav nav-pills nav-stacked Starts --> */}
                  <li >
                    <button href=""  onClick={investorDetail} >
   
                      <i class="fa fa-heart" ></i>Investors List{" "}
                    </button>
                  </li>

                  <li >
                    <button href="" onClick={()=>getInvestmentList()}>

                      <i class="fa fa-list" ></i>Investment List{" "}
                    </button>
                  </li>
				  
				  <li >
                    <button href="" onClick={()=>newLeads()}>

                      <i class="fa fa-list" ></i>New Leads{" "}
                    </button>
                  </li>
                  
                  {/* <li class="">
                    <button href="my_account.php?raise_concern">
                      {" "}
                      <i class="fa fa-headphones"></i> Raise Your concern{" "}
                    </button>
                  </li> */}
                
                  <li>
                    <button href="" onClick={()=>{logout()}} >
                      
                      <i class="fa fa-sign-out"></i> Logout{" "}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        
        <div className="col-md-9">
          <div className="commercial customer-detailed-info" >
          {toggle==="" &&  <div class="count-section">
              <div class="row">
                <div class="col-md-3 col-sm-6">
               
			  <div class="countbox">
				  <div class="countbox-icon">
					  <span><i class=" fa fa-university"></i></span>
				  </div>
				  <div class="countbox-description">
					<h3 class="countbox-title">Total Investment</h3>
					<p class=""><i class=" fa fa-rupee"></i> 45,000</p>
				  </div>
			  </div>
			</div>
			<div class="col-md-3 col-sm-6">
			  <div class="countbox yellow">
				  <div class="countbox-icon">
				  <span><i class=" fa fa-sharp fa-solid fa-motorcycle"></i></span>
			  </div>
			  <div class="countbox-description">
				<h3 class="countbox-title">E-bike</h3>
				<p class=""><i class=" fa fa-rupee"></i> 45,000</p>
			  </div>
		  </div>
		</div>
		<div class="col-md-3 col-sm-6">
		  <div class="countbox ">
			  <div class="countbox-icon">
				<span><i class=" fa fa-battery"></i></span>
			  </div>
			  <div class="countbox-description">
				<h3 class="countbox-title">Livguard 40Ah</h3>
				<p><i class=" fa fa-rupee"></i> 45,000</p>
			  </div>
		  </div>
		</div>
		<div class="col-md-3 col-sm-6">
		  <div class="countbox yellow">
			  <div class="countbox-icon">
			  <span><i class=" fa fa-battery"></i></span>
			  </div>
			  <div class="countbox-description">
				<h3 class="countbox-title">Livguard 100Ah</h3>
				<p class=""><i class=" fa fa-rupee"></i> 45,000</p>
			  </div>
		  </div>
		</div>
	  </div>
	</div>}

	{toggle==='faq' && <Faq/> }
		{toggle==="" &&  <div class="count-section">
		  <div class="row">
			<div class="col-md-3 col-sm-6">
			  <div class="countbox">
			  <div class="countbox-icon">
				  <span><i class=" fa fa-users"></i></span>
			  </div>
			  <div class="countbox-description">
				<h3 class="countbox-title">Total Investors</h3>
				<p class="">899</p>
			  </div>
		  </div>
		</div>
		<div class="col-md-3 col-sm-6">
		  <div class="countbox yellow">
			  <div class="countbox-icon">
				  <span><i class=" fa fa-user-o"></i></span>
			  </div>
			  <div class="countbox-description">
				<h3 class="countbox-title">Active/ Inactive</h3>
				<p class="">700/199</p>
			  </div>
		  </div>
		</div>
		<div class="col-md-3 col-sm-6">
		  <div class="countbox">
			  <div class="countbox-icon">
				  <span><i class=" fa fa-user-circle"></i></span>
			  </div>
			  <div class="countbox-description">
				<h3 class="countbox-title">Approved/ Pending</h3>
				<p class="">500/120</p>
			  </div>
		  </div>
		</div>
		<div class="col-md-3 col-sm-6">
		  <div class="countbox yellow">
			  <div class="countbox-icon">
				  <span><i class=" fa fa-list"></i></span>
			  </div>
			  <div class="countbox-description">
				<h3 class="countbox-title">single/Multiple</h3>
				<p class="">500/700</p>
			  </div>
		  </div>
		</div>               
	  </div>
	</div>}

	{toggle==="" &&  <div class="chart">
	  <div class="row">
		<div class="col-md-6">
		  <HighchartsReact  style={{width:"20px"}} highcharts={Highcharts} options={options1}/>
		</div>
		<div class="col-md-6">
		  <HighchartsReact  style={{width:"20px"}} highcharts={Highcharts} options={options5}/>

		</div>
	  </div>
	</div>}

	{toggle==="" && <div class="chart">
	  <div class="row">
		<div class="col-md-6">
		  <HighchartsReact  style={{width:"20px"}} highcharts={Highcharts} options={options2}/>
		</div>
		<div class="col-md-6">
		<HighchartsReact  style={{width:"20px"}} highcharts={Highcharts} options={options3}/>

		</div>
	  </div>
	</div>}
			
  {toggle==="investor-details" && <div>

	   {!loading ? <>
	 <div className='filters' style={{display:"flex"}}></div>
	   {/*<div style={{display:"flex",marginBottom:"20px" }} className="mt-3">
	<select class="form-select" aria-label="Default select example" onChange={(e)=>{chooseOption(e.target.value)}} style={{width:"100%", marginLeft:"0px"}}>
	 
	  <option value="investment" > Investment Based </option>
	  <option value="kyc" >KYC Based</option>
	  <option value="product">Product Based</option>
	</select>


		

	{ filter=="investment" && <div><select class="form-select" aria-label="Default select example">
	  <option value="Active" >Active</option>
	  <option value="InActive" >Inactive</option></select></div>
	}
	{ filter=="kyc" && <select class="form-select" aria-label="Default select example" >

	  <option value="pending" >Pending</option>
	  <option value="approved" >Approved</option></select>
	}
	{ filter=="product" && <select class="form-select" aria-label="Default select example">

	  <option value="single" >Single</option>
	  <option value="multiple" >Multiple</option></select>
	}

	<div><button className='btn-default' style={{marginLeft:"175px"}}>Search</button></div>
	</div>*/}
	<table class="table table-bordered table-hover">
      
      <thead style={{backgroundColor:"#f47920"}}>
         
		<tr>
			<th>Mobile</th>
			<th>Asset Name </th>
			<th>Quantity</th>
			<th>Amount Invested</th>
			<th>Order ID</th>
			<th>Order Date</th>
			<th>No. of EMIs completed</th>
			<th>Order Approved Date</th>
			<th>Payment Status</th>
			{/*<td align="right">{val.payout}</td>
			<td align="right">{val.gst}</td>
			<td>{val.payment}</td>
			<td>{val.payout}</td>
			*/}

		</tr>

		</thead>
		<tbody>
		{investmentList.map((val,index)=>(

		 <tr key={index}>
           <td>{val.mobile_no}</td>
            <td>{val.plan}</td>
            <td>{val.qty}</td>
            <td>{val.investment}</td>
            <td>{val.order_id}</td>
            <td>{val.order_date}</td>
            <td id={'emiup_'+val._id.$oid}>
			{val.no_submitted_emi}
			<i class="fa fa-edit" onClick={()=>{showInvestomentAction(val._id.$oid,val.no_submitted_emi)}} ></i>
			</td>
            <td>{val.order_approved_date}</td>
            <td>
			{(val.payment_status ? val.payment_status : 'Pending')}
			</td>
         </tr>
        
        ))}
		</tbody>
    </table> 
    </> : <Loader/>}
      </div>
	}

    {toggle==="investment-details" &&  <div class="investors-data"  >
           
          {!loading?<>
            <div style={{display:"flex" , justifyContent:"space-between"}}>
            <h2>Investors Detail</h2>
            {/*<div class="input-group" style={{width:"auto"}}>
			  <div class="form-outline">
				<input type="search" id="form1" class="form-control" style={{ borderRadius:"6px 0px 0px 6px"}} />

			  </div>
			  <button type="button" style={{backgroundColor:"#f47920" , color:"#fff",border:"#f47920", height:"38px" , boxShadow:"inherit", borderRadius:"0 6px 6px 0px" , boxShadow:"  0 5px 10px rgba(0, 0, 0, 15%)"}} class="btn btn-primary">
				<i class=" fa fas fa-search"></i>
			  </button>
			</div>*/}
			</div>
              <Table striped bordered hover >
             
                <thead>
                  <tr>
                    <th scope="col">S.no</th>
                    <th scope="col">Name</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Type</th>
                    <th scope="col">Investment ID</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                
                  {users.map((val,index)=>(
					<tr>
					<td>{index+1}</td>
					<td>{val.full_name}</td>
					<td>{val.mobile_no}</td>
					<td>{val.email}</td>
					<td>{val.address}</td>
					<td>{val.type}</td>
					<td>{val.investor_id}</td>
					<td><i class="fa fa-eye" onClick={()=>{singleInvestor(val.mobile_no)}}  style={{color:"#f47920"}}></i></td>

					</tr>

					))}
                 
                </tbody>
              </Table>


              </>:<Loader/>}
            </div>}
			
		
		{toggle==="new-leads" &&  <div class="leads-data"  >
           
          {!loading?<>
            <div style={{display:"flex" , justifyContent:"space-between"}}>
            <h2>New Leads</h2>
            
			</div>
			
              <Table striped bordered hover >
             
                <thead>
                  <tr>
                    <th scope="col">S.no</th>
                    <th scope="col">Name</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Added Date</th>
                  </tr>
                </thead>
                <tbody>
                
                  {leads.map((val,index)=>(
					<tr>
					<td>{index+1}</td>
					<td>{val.name}</td>
					<td>{val.mobile_no}</td>
					<td>{val.created_date}</td>
					</tr>

					))}
									 
				</tbody>
				
		  </Table>


		  </>:<Loader/>}
		</div>}
			

      {toggle=='singleInvestorDetails' && <div>
      <div class="section-title">
	<h2>Investor Detail</h2>
	<button class="btn-default" href="" onClick={investorDetail}>Back</button>
	</div>
      <div class="row justify-content-md-center">
         <div class="col-md-12">
            <div class="card " style={{width:"70vw", right:"0%"}}>
               <div class="card-header add-shadow">

                  <ul role="tablist" class="nav nav-pills mb-3 wd-tab-menu" >
                     <li class="nav-item"> <button data-toggle="pill" className={toggleState===1 ?"nav-link active" : "nav-link"} onClick={()=>switchTab(1)}> <i class="fa fa-file mr-2" ></i>Overview </button> </li>
                     <li class="nav-item"> <button data-toggle="pill" className={toggleState===2 ?"nav-link active" : "nav-link"} onClick={()=>switchTab(2)}> <i class="fa fa-bank mr-2"></i> KYC </button> </li>
                     <li class="nav-item"> <button data-toggle="pill" className={toggleState===3 ?"nav-link active" : "nav-link"} onClick={()=>switchTab(3)}> <i class="fa fa-bank mr-2"></i> Bank Details </button> </li>
                     <li class="nav-item"> <button data-toggle="pill"  className={toggleState===4 ?"nav-link active" : "nav-link"} onClick={()=>switchTab(4)}> <i class="fa fa-file mr-2"></i> Asset Detail </button> </li>
                  </ul>
{/* 
                  {users.map((item, i) => (
                    <tr key={i}>
                        <td>{item.userId}</td>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.body}</td>
                    </tr>))} */}
                  <div className="tab-content">
                    <div id="" class="tab-pane fade active show " className={toggleState===1 ?"active" : "disabled"}>
                      <h2 style={{background: "#000",color: "#fff",padding: "5px"}}>Basic Detail</h2>
                      <div class="row">
                        <div class="col-md-3">
                          <div class="form-group">
                          
                            <label for="exampleInputEmail1">Name : </label>	  {investors[0].full_name}  
                            </div>
                        </div>

                        <div class="col-md-3">
                          <div class="form-group">
                            <label for="exampleInputEmail1">Phone No : </label>{investors[0].mobile_no}	
                          </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                              <label for="exampleInputPassword1">Status: </label> {investors[0].status}					  s
                            </div>
                        </div>

                        <div class="col-md-3">
                          <div class="form-group">
                            <label for="exampleInputPassword1">Address: </label> {investors[0].address}					  
                          </div>
                        </div>

                        </div>
                    </div>   
                  
                    <div id="" class="tab-pane fade" className={toggleState===2 ?"active" : "disabled"}>
                      <h2 style={{background: "#000",color: "#fff",padding: "5px"}}>Documents Uploaded</h2>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Document</th>
                              <th>Added On</th>
                              <th>Action</th>
                              <th>KYC Request</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Pan Card</td>
                              <td>{investors[0].kyc_image_date? investors[0].kyc_image_date:"Not Found"}</td>
                              <td>
                                <a href={investors[0].pancard}  class="btn btn-primary btn-default" download="custom-filename.jpg" style={{marginRight:"5px"}} ><i className="fa fa-download" ></i></a> 
                                <a href={investors[0].pancard} class="btn btn-primary btn-default" target="_blank" ><i class="fa fa-eye"></i></a>
                              </td>
                              <td id="pancard">
								{(investors[0].is_pancard_approve == 0 || investors[0].is_pancard_approve == '') ? <> 
                                <a class="btn btn-primary btn-default" onClick={() => investorKycUpdate(investors[0].mobile_no,'pancard','accept')}  title="Approve" style={{marginRight:"5px"}} ><i className="fa fa-check" ></i></a> 
                                <a class="btn btn-primary btn-default" onClick={() => investorKycUpdate(investors[0].mobile_no,'pancard','reject')} title="Reject" ><i class="fa fa-close"></i></a>
								</> : (investors[0].is_pancard_approve == 1 ? 'Approved' : 'Rejected')}
							  </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Address Proof</td>
                              <td>{investors[0].kyc_image_date? investors[0].kyc_image_date:"Not Found"}</td>
                              <td>
                                <a href={investors[0].address_proof}  class="btn btn-primary btn-default" download="custom-filename.jpg"  style={{marginRight:"5px"}}><i className="fa fa-download" ></i></a> 
                                <a href={investors[0].address_proof} class="btn btn-primary btn-default" target="_blank" ><i class="fa fa-eye"></i></a>
                              </td>
                              <td id="address_proof">
								{(investors[0].is_address_approve == 0 || investors[0].is_address_approve == '') ? <> 
                                <a class="btn btn-primary btn-default" onClick={() => investorKycUpdate(investors[0].mobile_no,'address_proof','accept')} title="Approve" style={{marginRight:"5px"}} ><i className="fa fa-check" ></i></a> 
                                <a class="btn btn-primary btn-default" onClick={() => investorKycUpdate(investors[0].mobile_no,'address_proof','reject')} title="Reject" ><i class="fa fa-close"></i></a>
								</> : (investors[0].is_address_approve == 1 ? 'Approved' : 'Rejected')}
							  </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>GST Certificate</td>
                              <td>{investors[0].kyc_image_date? investors[0].kyc_image_date:"Not Found"}</td>
                              <td>
                                <a href={investors[0].gst}  class="btn btn-primary btn-default" download="custom-filename.jpg"  style={{marginRight:"5px"}}><i className="fa fa-download" ></i></a> 
                                <a href={investors[0].gst} class="btn btn-primary btn-default" target="_blank" ><i class="fa fa-eye"></i></a>
                              </td>
                              <td id="gst">
								{(investors[0].is_gst_approve == 0 || investors[0].is_gst_approve == '') ? <> 
                                <a class="btn btn-primary btn-default" onClick={() => investorKycUpdate(investors[0].mobile_no,'gst','accept')} title="Approve" style={{marginRight:"5px"}} ><i className="fa fa-check" ></i></a> 
                                <a class="btn btn-primary btn-default" onClick={() => investorKycUpdate(investors[0].mobile_no,'gst','reject')} title="Reject" ><i class="fa fa-close"></i></a>
								</> : (investors[0].is_gst_approve == 1 ? 'Approved' : 'Rejected') }
							  </td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>Cancelled Cheque</td>
                              <td>{investors[0].kyc_image_date? investors[0].kyc_image_date:"Not Found"}</td>
                              <td>
                                <a href={investors[0].cheque}  class="btn btn-primary btn-default" download="custom-filename.jpg"  style={{marginRight:"5px"}}><i className="fa fa-download" ></i></a> 
                                <a href={investors[0].cheque} class="btn btn-primary btn-default" target="_blank" ><i class="fa fa-eye"></i></a>
                              </td>
                              <td id="cheque">
								{(investors[0].is_check_approve == 0 || investors[0].is_check_approve == '') ? <> 
                                <a class="btn btn-primary btn-default" onClick={() => investorKycUpdate(investors[0].mobile_no,'cheque','accept')} title="Approve" style={{marginRight:"5px"}} ><i className="fa fa-check" ></i></a> 
                                <a class="btn btn-primary btn-default" onClick={() => investorKycUpdate(investors[0].mobile_no,'cheque','reject')} title="Reject" ><i class="fa fa-close"></i></a>
								</> : (investors[0].is_check_approve == 1 ? 'Approved' : 'Rejected') }
							  </td>
                            </tr>
                          </tbody>
                        </Table>

                      
                    </div>
               
                    <div  class="tab-pane fade" className={toggleState===3 ?"active" : "disabled"}>                    
                      <h2 style={{background: "#000",color: "#fff",padding: "5px"}}>Bank Info</h2>
                      <Table striped bordered hover>
                        <tbody>
                            <tr>
                              <td><b>Bank Name</b></td>
                              <td>ICICI</td>
                            </tr>
                            <tr>
                              <td><b>Account Holder Name</b></td>
                              <td>Holder's Name</td>
                            </tr>
                          
                            <tr>
                              <td><b>Account Number</b></td>
                              <td>012345678901234</td>
                            </tr>
                            <tr>
                              <td><b>Branch</b></td>
                              <td>Branch Name Here</td>
                            </tr>
                            <tr>
                              <td><b>IFSC</b></td>
                              <td>ICICI0011</td>
                            </tr>
                          </tbody>
                        </Table>
                      
                    </div>
                    <div id="" class="tab-pane fade" className={toggleState===4 ?"active" : "disabled"}>
                      <h2 style={{background: "#000",color: "#fff",padding: "5px"}}>Investment on Assets</h2>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Asset</th>
                              <th>Date</th>
                              <th>Amount Invested</th>
                              <th>Payment Received</th>
                              <th>Current Outstanding</th>
                              <th>Tenure</th>
                              <th>EMI Detail</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>E-bike</td>
                              <td>5/6/22</td>
                              <td>5,00,000</td>
                              <td>3,50,000</td>
                              <td>1,50,000</td>
                              <td>2 Years</td>
                              <td><button onClick={handleCellOnClick} class="btn btn-default">Show Detail</button></td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Livguard 40AH</td>   
                              <td>25/4/22</td>                        
                              <td>5,00,000</td>
                              <td>3,50,000</td>
                              <td>1,50,000</td>
                              <td>2 Years</td>
                              <td><button class="btn btn-default">Show Detail</button></td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Livguard 100AH</td>
                              <td>22/6/21</td>
                              <td>5,00,000</td>
                              <td>3,50,000</td>
                              <td>1,50,000</td>
                              <td>2 Years</td>
                              <td><button class="btn btn-default">Show Detail</button></td>                              
                            </tr>
                          </tbody>
                        </Table>
                      {toggleInvestorAssetTable &&  <div >
                        <h2 style={{background: "#000",color: "#fff",padding: "5px"}}>EMI Detail</h2>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Month</th>
                              <th>Transaction Id</th>
                              <th>Payment Mode</th>
                              <th>Amount Received</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>January</td>
                              <td>123456789</td>
                              <td>Online</td>
                              <td>25,000</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>February</td>   
                              <td>123123123</td>                       
                              <td>DD</td>
                              <td>25,000</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>March</td>
                              <td>456456456</td>
                              <td>Online</td>
                              <td>25,000</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    
                 }
                 </div>
                  <div id="offline" class="tab-pane fade">
                     <br/>
                     <p>
                        
                     </p>
                  </div>
                  
               </div>
            </div>
         </div></div></div></div>}

          </div> 
        </div>
      </div>
    </div>
    <Footer />
 </div>

    </div>
  )
}
