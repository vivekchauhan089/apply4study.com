import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Alert from 'react-bootstrap/Alert';
import { Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './assets/Header';
import Footer from './assets/Footer';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import Kycnew from './assets/Kycnew';

import { LocalActivity } from '@mui/icons-material';
import { objectEach } from 'highcharts';
// import { JSON } from 'mysql/lib/protocol/constants/types';

export default function Login() {
    const navigate=useNavigate();
    const [show,setShow]=React.useState(false);
    const [mobile, setMobile]=useState("");
    const [user_otp, setUserOtp]=useState("");
    const [visible, setVisible]=useState(true);
    const [msg , setMsg]=useState("");
  //   const [formerror , setError]=useState({});
  //   const [submit ,isSubmit]=useState(false);
  //  const [status , setStatus]=useState(null);
  //  const isOtp=(user_otp !="");
   let reg=/^[6-9]\d{9}$/i;
   let regOtp=/^[0-9\b]+$/;
   const isOtp=regOtp.test(user_otp);
   const isMobile=!reg.test(mobile) ;
  
  useEffect(()=>{
  const auth=localStorage.getItem("token");
  if(auth){
    navigate("/");
  }


},[])




// useEffect(()=>{

//     if(Object.keys(formerror).length===0 && isSubmit){
    
//        console.log("successss");
//     }
// }, [formerror])
 
const func1=(e)=>{

    var raw = {"token":"msl2n2bthl","jobType":"login","mobile":mobile};
   
    var requestOptions = {
      // mode: 'no-cors',
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
     },
     body: JSON.stringify(raw),
     };
     
   fetch("http://localhost/investor_api/index.php/InvestorApis", requestOptions)
     .then(response => response.text())
     .then(result =>{
       
		const res=JSON.parse(result);
		
		if(parseInt(res.status)==200){
			setVisible(false);
		}else{
			setMsg(res.msg);
			setShow(true);
			setTimeout(function(){ 
				setShow(false);
			}, 3000);
		}
	
	})
      
    .catch(error => console.log('error', error));

}
function authentication(){
    var raw = {"token":"msl2n2bthl","jobType":"otp_verified","otp":user_otp , "mobile_no":mobile};
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
       const res=JSON.parse(result);
	   if(parseInt(res.status)==200){
		let token=res.auth_token;
        localStorage.setItem('investor_detail', base64_encode(JSON.stringify(res)));
        localStorage.setItem('token', token);
		if( res.investor_details?.[0].type == "Admin" )
		{
			window.location.href = "/dashboard";
		} else {
			window.location.href = "/investor";
		}
      }else{
        setMsg(res.msg);
        setShow(true)
        
      }
        
      })       
      .catch(error => console.log('error', error));
 
}
function validateMob(e){
  if (!(e.keyCode >= 48 && e.keyCode <= 57 ) && e.keyCode!=8) { 
    e.preventDefault();
  }
}
function validate(){
    const errors={};
    let reg=/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    if(!reg.test(mobile)){
      errors.mobile="Invalid mobile";
      
     }
     if(!mobile){
        errors.mobile ="mobile is required";
     }
     if(!user_otp){
        errors.otp="otp is required";
     }

}

  return (
  
    <div>
    
       
<div className='col-md-12 pt-5 pb-5'  style={{ backgroundColor: "#000000" , height:"100vh"}}>
        <div className="container" >
            <div className="row">
                <div className="col-md-12 mb-5 mt-5"   >
                    <div className="login-form">
                        <h1><span className='orange-circle' style={{top: "14px",left:"7%"}}></span>Let's get you started</h1>
                        <div className="enter-mobile">
                       
                
                   <form>
                                
                            {visible&&    <div className="enter-mobile">
                                    <div className="form-group row">
										{show && <Alert id="login-alert" style={{color:"red" , fontWeight:"500" , fontSize:"14px" , backgroundColor:"transparent" , height:"1px"}} >
										{msg}</Alert>}
                                       <div className="col-sm-12">
                                       <label className="" style={{ float: "left" }}>Mobile Number</label>
                                            <input type="text" className="form-control-plaintext" maxlength="10" placeholder="Enter Mobile Number" onKeyDown={(e)=>{validateMob(e)} }  onChange={(e)=>{setMobile(e.target.value)}} />
                                        </div>
                                        <button type="button" onClick={func1} disabled={isMobile}  className="btn btn-default mb-2">Send OTP</button>
                                    </div>
                                </div>  }
                           
                                {!visible &&
                                <div className="enter-otp">
                                    <div className="form-group row">
                                   {show && <Alert style={{color:"red" , fontWeight:"500" , fontSize:"14px" , backgroundColor:"transparent" , height:"1px"}} >
                                   {msg}
                                   </Alert>} 
                                                                           <div className="col-sm-12">

                                            <label className="" style={{ float: "left" }}>OTP</label>
                                            <input type="text" className="form-control-plaintext"  placeholder="Enter OTP"  onChange={(e)=>{setUserOtp(e.target.value)}}/>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-default mb-2" disabled={!isOtp} onClick={authentication} >Continue</button>
                                </div>
}
                                
                            </form>
                        </div>
                      
                             <div className='text-center'>
                                <p>Not a member?<a href="" onClick={()=>{navigate('/signup')}} className='' style={{ display:"inline", color:"#f47920"}}>&nbsp; Sign Up</a></p>
                             </div>
                    </div>
                    
                </div>
            </div>
        </div>
        </div>
        </div>
  

    
  )
}
