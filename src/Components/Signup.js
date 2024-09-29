import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css';
import Header from './assets/Header';
import Footer from './assets/Footer';
import { useEffect } from 'react';
import { Alert } from '@mui/material';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
export default function Signup() {
    const navigate = useNavigate();
   const [type , setType]=useState("");
   const [fullname, setFullName]=useState("");
   const [mail , setMail]=useState("");
   const [mobile , setMobile]=useState("");
   const [address , setAddress]=useState("");
   const [msg, setMsg]=useState(" ");
   const [show , setShow]=useState(false);
   const [formerror , setError]=useState({});
   const [submit ,isSubmit]=useState(false);
   const [status , setStatus]=useState(null);
//    const [typeofinvestor , setTypeofinvestor]=useState(" ");
let regMobile=/^[6-9]\d{9}$/i;
let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

   let name;
 
   const areAllFieldsFilled = (mobile != "") && regMobile.test(mobile) &&(address != "") && (mail != "")&& (fullname!="") &&(type!="");

//    const handle=(e)=>{
//      setType(e.target.value)
//      name=e.target.value;
//      localStorage.setItem("type", name);
//     //  console.log(name);

//    }

useEffect(()=>{
    const auth=localStorage.getItem("token");
    if(auth){
      navigate("/");
    }
  
  
  })
   useEffect(() => {
    window.scrollTo(0, 0);

  }, [])
 

  function submitForm(){

	const errors = validate();
	if(typeof errors.mail != 'undefined' || typeof errors.mobileno != 'undefined')
	{		
		setError(errors);
		isSubmit(false);
		return false;
	}

    var raw =  {"token":"msl2n2bthl","jobType":"register","full_name":fullname,"mobile_no":mobile,"email":mail,"address":address,"type":type};
    
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
        console.log(result); 
		const res=JSON.parse(result);
		
		const m=res.msg;
		if(parseInt(res.status)==200){
			navigate("/login");
		}
	   else{
		  setMsg(m);
		setShow(true);
	   }
   
    })
        
     .catch(error => console.log('error', error));
    //   navigate("/Kycnew");

    // if(msg=="Investor Is saved."){
    //    navigate("/");
   
    // }
      //setError(validate(mobile));
	isSubmit(true);
   
}
// function SubmitButton(){
//     if (mobile && address && mail){
//       return <button type="submit" onSubmit={()=>{navigate("/")}}>Button</button>
//     } else {
//       return <button type="button" disabled>Button</button>
//     };
//   };

function validateMob(e){
  if (!(e.keyCode >= 48 && e.keyCode <= 57 ) && e.keyCode!=8) { 
    e.preventDefault();
  }
}

function validate(){
 const errors={};

    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regEmail.test(mail)){
    errors.mail="invalid email";
}
    let regmobile=/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    if(!regmobile.test(mobile)){
      errors.mobileno="Invalid mobile";
      
     }
     
    return errors;

}

    return (

        <div>
            <section className='main'  style={{ backgroundColor: "#000000" }}>
                <div className="container "  >
                    <div className="row">
                        <div className="col-md-12 mt-5 mb-5"   >
                            <div className="login-form" style={{ width: "600px", height: "auto" }}>
                                <h1 style={{marginBottom:"10px"}}>Sign Up</h1>
                                <span style={{ textAlign: "center" }}>Already registered?<a href="" onClick={()=>{navigate('/login')}} style={{ display: "inline" }}>Login</a></span>
                              {show &&  <Alert style={{backgroundColor:"#f47920",color:"#fff" , fontWeight:"500" , fontSize:"16px" , marginTop:"20px"}}>
                                             {msg}
                                  </Alert>}
                                <div className="enter-mobile">
                                    <form>

                                        <div className="enter-mobile">
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                    <label className='naam' style={{ float: "left" }}>Full Name</label>
                                                    <input type="text"  className="form-control-plaintext mb-3" id="staticEmail" onChange={(e)=>{setFullName(e.target.value)}} placeholder='eg. jane doe' />
                                                </div>

                                            </div>

                                        </div>
                                        <div className="enter-mobile">
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                    <p>{formerror.mobileno}</p>
                                                    <label className='naam' style={{ float: "left" }}>Mobile Number</label>
                                                    <input type="text" className="form-control-plaintext mb-3" id="staticEmail" placeholder='Mobile number' maxlength="10" onKeyDown={(e)=>{validateMob(e)} } onChange={(e)=>{setMobile(e.target.value)}} />
                                                </div>

                                            </div>

                                        </div>
                                        <div className="enter-mail">
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                <p>{formerror.mail}</p>
                                                    <label className='naam' style={{ float: "left" }}>Email</label>
                                                    <input type="email" className="form-control-plaintext mb-3" id="staticEmail"  onChange={(e)=>{setMail(e.target.value)}} placeholder='email address' />
                                                </div>

                                            </div>

                                        </div>
                                        <div className="enter-add">
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                    <label className='naam' style={{ float: "left" }}>Address</label>
                                                    <input type="text"  className="form-control-plaintext mb-3" id="staticEmail"  onChange={(e)=>{setAddress(e.target.value)}} placeholder='Address' />
                                                </div>

                                            </div>

                                        </div>

                                        <div class="enter-type">
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                    <label className='naam' for="inputState" style={{ float: "left"}} >Type of Investor</label>
                                                    <select id="inputState" class="form-control" style={{backgroundColor:"#eee" }}   onChange={(e)=>{setType(e.target.value)} }>
                                                        <option >Select</option>
                                                        <option >Company</option>
                                                        <option >Individual</option>
                                                    </select>
                                                </div></div></div>
                                    </form>
                                </div>

                                <div className='mt-4 '>
                                  
                                     <button className="btn btn-default" type="submit"style={{width:"100%"}}  disabled={!areAllFieldsFilled}onClick={submitForm}>Sign Up</button> 
                                </div>
                                <p style={{ textAlign: "center" }}>By signing up, you agree to the <b>Terms & conditions</b> and <b>Privacy Policy</b></p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

         
        </div>

    )
}
