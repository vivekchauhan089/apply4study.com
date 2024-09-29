import React, { Component } from "react";
import "./sidebar.css";
import Invest_summary from "./Invest_summary";
import Invest_calendar from "./Invest_calendar";
import Footer from "../assets/Footer";
import Header from "../assets/Header";
import Loader from "../Loader";
import 'bootstrap/dist/css/bootstrap.css';
import AgreementUser from "../AgreementUser";
import Table from 'react-bootstrap/Table';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import { useState } from "react";
import { render } from "@testing-library/react";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import Faq from "../assets/Faq";
import { Link } from "react-router-dom";
import Payment from "./Payment";
import { Redirect } from "react-router-dom";
import Kycstatus from "./Kycstatus.js";
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import Payment_summary from "./Payment_summary";

export class Sidebar extends Component {
 
 investor=base64_decode( localStorage.getItem('investor_detail'));
 token = localStorage.getItem("token")?localStorage.getItem("token"):'';
 investor_detail=JSON.parse(this.investor);
 mobile=this.investor_detail.investor_details?.[0].mobile_no;
 profile=this.investor_detail.investor_details?.[0].profile_image;
  name=this.investor_detail.investor_details?.[0].full_name;
  email=this.investor_detail.investor_details?.[0].email;
  address=this.investor_detail.investor_details?.[0].address;
  status=this.investor_detail.investor_details?.[0].status;
  security=this.investor_detail.investor_details?.[0].security_amount;
  name=localStorage.getItem('investor_detail')?localStorage.getItem('investor_detail'):'';
	
	
  investor_detail={"name":"","profile_image":""};	

		investor=base64_decode(this.name);
	investor_detail=JSON.parse(this.investor);
		//console.log(investor_detail.investor_details?.[0].profile_image);
   
	
 constructor(props) {
    super(props)   
    this.state = {
      tabType: this.props.title?this.props.title:"front",
      toggleState:"credit",
      status:"pending",
      imageData:[],
      loading:false

      
    }
    
  }
 
 logout=()=>{
	
		var raw = {"token":localStorage.getItem("token"),"jobType":"logout"};
		var requestOptions = {
		   method: 'POST',
		   headers: {
			 'Content-Type': 'application/json'
		 },
		 body: JSON.stringify(raw),
		 };
		 //console.log(raw);
		fetch("https://investment-api.mooving.com/index.php/InvestorApis", requestOptions)
		 .then(response => response.text())
		 .then(result =>{
		  const res=JSON.parse(result);
		  if(parseInt(res.status)==200){
			   //console.log(result);
			   localStorage.clear();
			 window.location.href = "/login";
		 }}
		)
		.catch(error => console.log('error', error));
		
	}

  toggleMe = (value) => {   
    this.setState({
      tabType: value
      
    })
    // window.location.href = "/"+value;
    
    
  }

  setLoader=(val)=>{
    this.setState({
      loading: val
      
    })
    

  }
  toggleTab=(val)=>{  
   this.setState({
      toggleState:val
   
      
   })}
  
//  logout=()=>{
   
//   this.toggleMe("logout")
	
// 		var raw = {"token":localStorage.getItem("token"),"jobType":"logout"};
// 		var requestOptions = {
// 		 //  mode: 'no-cors',
// 		   method: 'POST',
// 		   headers: {
// 			 'Content-Type': 'application/json'
// 		 },

// 		 body: JSON.stringify(raw),
// 	 //    redirect: 'follow'
// 		 };
// 		 console.log(raw);
// 	   fetch("https://investment-api.mooving.com/index.php/InvestorApis", requestOptions)
// 		 .then(response => response.text())
// 		 .then(result =>{
// 		   console.log(result);
// 		   localStorage.clear();
// 		   Navigate("/login")})

// 		   .catch(error => console.log('error', error));
		
// 	}


 
componentDidMount(){
// const auth=localStorage.getItem("token");
this.setLoader(true)
  var raw =  {"token":this.token,"jobType":"investor_datails", "mobile_no":this.mobile}
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(raw),
  };
fetch("https://investment-api.mooving.com/index.php/InvestorApis", requestOptions)
  .then(response => response.text())
  .then((result) =>{
    this.setLoader(false)
    let res=JSON.parse(result);
	localStorage.setItem('investor_detail', base64_encode(JSON.stringify(res)));
    let index=res.investor_details;
	this.setState({
		imageData:index?.[0]
	});
   // console.log(this.state.imageData);
 
})
     
  .catch(error => console.log('error', error));


}
   
   
  //  componentDidMount() {
  //     window.scrollTo(0, 0)
  //     if(localStorage.file===null){
  //        this.setState({
  //           status:"completed"
  //        });
  //        //console.log(this.status);
  //     }
  //        else{
  //           this.setState({
  //              status:"pending"
  //           });
  //           //console.log(this.status);
  //        }
   
        
  //   }
// navigate=()=>{
//   Navigate("/Kycnew")
// }

render(){
  return ( 
   <div>
       <Header/>
  
    <div style={{backgroundColor:"#f5f5f5"}}>

      <div className="container p-3">
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
                      <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
                      <label for="imageUpload"></label>
                  </div>
                  <div class="avatar-preview">
                  <img src={this.investor_detail.investor_details?.[0].profile_image!=""? this.investor_detail.investor_details?.[0].profile_image : "../avatar.png"} className="img-responsive" />
                  </div>
                </div>
{/* 
                  <h3 align="center" class="panel-title">
                    Name here
                  </h3> */}
                </div>
                {/* <!-- panel-heading Ends --> */}
                <div class="side-bar category category-md">
                  {/* <!-- panel-body Starts --> */}
                  <ul >
                    {/* <!-- nav nav-pills nav-stacked Starts --> */}
                    <li >
                      <button href="" onClick={() => this.toggleMe("front")}>

                        <i class="fa fa-heart" ></i> Details{" "}
                      </button>
                    </li>
              
                    <li >
                      <button href="" onClick={() => this.toggleMe("kyc")}>

                        <i class="fa fa-heart" ></i> KYC Documents and status{" "}
                      </button>
                    </li>
                    <li >
                      <button href="" onClick={() => this.toggleMe("agreementuser")}>

                        <i class="fa fa-heart" ></i> Agreement{" "}
                      </button>
                    </li>
                    <li class="">
                      <button href="" onClick={() => this.toggleMe("payment_status")}>
                       
                        <i class="fa fa-bolt"></i>Payment and status{" "}
                      </button>

                    </li>
                    <li >
                     

                    <li class="">
                      <button href="my_account.php?loan_status" onClick={() => this.toggleMe("investments")}>
                        {" "}
                        <i class="fa fa-dollar"></i> Investment Summary{" "}
                      </button>
                    </li>
                      <button href="" onClick={() => this.toggleMe("invest-status")}>
                        {" "}
                        <i class="fa fa-list"> </i>Investment Calender{" "}
                      </button>
                    </li>
                   
                    
                    <li class="">
                      <button href="my_account.php?faq" onClick={() => { this.toggleMe("faq") }}>
                        {" "}
                        <i class="fa fa-question"></i> FAQ{" "}
                      </button>
                    </li>
              
                    {/* <li class="">
                      <button href="my_account.php?edit_account" onClick={() => { this.toggleMe("edit") }}>
                        {" "}
                        <i class="fa fa-pencil"></i> Edit Account{" "}
                      </button>
                    </li> */}
                    <li>
                      <button  onClick={()=>{this.logout()}}>
                        
                        <i class="fa fa-sign-out"></i> Logout
                        
                     
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
          <div className="col-md-9">
            <div className="customer-detailed-info">
              {this.state.tabType==="front" && <div> {!this.state.loading? <><div class="tab-content">
                    <div id="" class="tab-pane fade active show " >
                      <h2 style={{background: "#000",color: "#fff",padding: "5px"}}>Basic Detail</h2>
                      <div class="row">
                        <div class="col-md-3">
                          <div class="form-group">
                            <label for="exampleInputEmail1">Name : </label>{this.state.imageData.full_name?this.state.imageData.full_name :""}		           
                            </div>
                        </div>

                        <div class="col-md-3">
                          <div class="form-group">
                            <label for="exampleInputEmail1">Phone No : </label>{this.state.imageData.mobile_no}
                          </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                              <label for="exampleInputPassword1">KYC Status: </label> <span style={{textTransform: 'capitalize'}}>{this.state.imageData.kyc_status}</span>				  
                            </div>
                        </div>


                        <div class="col-md-3">
                            <div class="form-group">
                              <label for="exampleInputPassword1">Address: </label> {this.state.imageData.address}				  
                            </div>
                        </div>


                        <div class="col-md-3">
                          {/* <div class="form-group">
                            <label for="exampleInputPassword1">Security Amount: </label> {this.state.imageData.security_amount}					  
                          </div> */}
                        </div>    
		        	        </div>
                    </div>   
                  </div></>:<Loader/>}</div>}
              {this.state.tabType === "kyc" && <><Kycstatus/>
             </> }


              {this.state.tabType === "invest-status" && <Invest_calendar/>}


    {this.state.tabType==="investments" && <Invest_summary/>}
 
    





     {this.state.tabType==="payment_status" && <Payment_summary/>}
	 
	 {this.state.tabType==="payment_detail" && <Payment/>}
  
     {this.state.tabType === "faq" && <Faq/>}

     {this.state.tabType==="agreementuser" &&<div className="container m-0"><AgreementUser/></div>}

    {this.state.tabType==="raise-concern" && <div>

              <div class="raise-concern">
    <h4 >Hi! How can I help You?</h4>
    <div class="concern-form">
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Title</label>
                <input type="text" class="form-control" id="exampleInputEmail1" placeholder=""/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Agreement ID</label>
                <input type="text" class="form-control" id="exampleInputPassword1" placeholder=""/>
            </div>
            <div class="form-group">
                <label for="exampleInputFile">Concern</label>
                <textarea class="form-control" rows="3"></textarea>
            </div>
            <button type="submit" class="btn-default" style={{width:"20%" , height:"9%" , marginTop:"20px"}}>Submit</button>
        </form>
        <p style={{textAlign:"center"}}>After you submit your response,<br/> we will get back to you within 72 hours</p>
    </div>
</div>           
                </div>}
            


       {this.state.tabType==="change-pass" && <div><h4>Change Password </h4>
       &nbsp;&nbsp;

<form action="" method="post">

<div class="form-group">

<label>Enter Your Current Password</label>

<input type="text" name="old_pass" class="form-control" required=""/>

</div>


<div class="form-group">

<label>Enter Your New Password</label>

<input type="text" name="new_pass" class="form-control" required=""/>

</div>


<div class="form-group">

<label>Confirm Your New Password</label>

<input type="text" name="new_pass_again" class="form-control" required=""/>

</div>

<div class="">

<button type="submit" name="submit"  style={{width:"20%" , height:"9%" , marginTop:"20px"}} className=" btn-default">
 Change Password

</button>

</div>

</form>

 </div>}

            {this.state.tabType==="edit" &&  <div>
            <h4> Edit Your Account </h4>

<form  method="post" enctype="multipart/form-data">

<div class="form-group">

<label> Name: </label>

<input type="text" name="c_name" class="form-control" required="" value=""/>


</div>

<div class="form-group">

<label> Email: </label>

<input type="text" name="c_email" class="form-control" required="" value=""/>


</div>

<div class="form-group">

<label> Country: </label>

<input type="text" name="c_country" class="form-control" required="" value=""/>


</div>

<div class="form-group">

<label> City: </label>

<input type="text" name="c_city" class="form-control" required="" value=""/>


</div>

<div class="form-group">

<label> Contact: </label>

<input type="text" name="c_contact" class="form-control" required="" value=""/>


</div>

<div class="form-group">

<label> Address: </label>

<input type="text" name="c_address" class="form-control" required="" value=""/>


</div>

<div class="form-group">

<label> Image: </label>

<input type="file" name="c_image" class="form-control" required=""/><br/>

{/* <img src="customer_images/<br />
<b>Notice</b>:  Undefined variable: customer_image in <b>/var/www/html/mooving_invest/edit_account.php</b> on line <b>68</b><br />
" width="100" height="100" class="img-responsive"> */}


</div>

<div class="">

<button name="update" class="btn btn-default">
 Update Now
</button>
</div>

</form>
</div>

       
}



</div>
            </div>
        </div>
      </div>
      <Footer />
   </div>
   </div>
  )
}

}
export default Sidebar