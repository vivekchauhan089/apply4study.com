import React, { useState } from "react";
import "./asset.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./Header";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { useEffect } from "react";
import Loader from "../Loader";

import Modal from "@mui/material/Modal";
import "bootstrap/dist/css/bootstrap.css";

import CryptoJS from 'crypto-js';

export default function Asset() {
  const navigate = useNavigate();
  const [bike, setBike] = useState([]);
 
  const [toggleState, setToggleState] = useState(1);
 
  const [open, setOpen] = React.useState(false);
  const  [link, setLink] = useState();
  
  const [mobile , setMobile]=useState("");
  const [loading , setLoading]=useState(false);
  
  const [fullname , setName]=useState("");

  const [details , setDetails]=useState(null)
  function handleOpen (p_link)  {

    if(localStorage.getItem("token")){
       setOpen(false);
       navigate(p_link);
    }
    else{
    setOpen(true);
   
    setLink(p_link);}

    
    //console.log(link);
  }
  function validate(e){
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) { 
      e.preventDefault();
    }
  }

    const handleClose = () => setOpen(false);
  // const toggleTab = (index) => {
  //   //    setToggleState(index);

  //   setToggleState(index);
  // };

  const style = {
    position: "absolute",
    top: "42%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 450,
    // height: 250,
    textAlign: "center",
    bgcolor: "background.paper",
    p: 0,
    // border: '2px solid #000',
    boxShadow: 24,

  };

  let regMobile=/^[6-9]\d{9}$/i;
 
 function CryptoJSAesEncrypt(str) 
 {
     //let str = '{"user_name":"1120003167","method":"password","password":"Sar@1234"}';
     
     const input = "YXNuc2p!c2RranNkc2Rqd3VxaTMyOTg5";
     const substring = input.substring(0, 32);
     const sha256Hash = CryptoJS.SHA256(substring).toString();
     let _key = CryptoJS.enc.Hex.parse(sha256Hash);
     
     const nullString = String.fromCharCode(0).repeat(16);
     const hash = CryptoJS.SHA256(nullString).toString(CryptoJS.enc.Hex).substr(0, 32);
     const binaryHash = CryptoJS.enc.Hex.parse(hash);
     
     let encrypted = CryptoJS.AES.encrypt(
         str, _key, {
         iv: binaryHash,
         mode: CryptoJS.mode.CBC,
         padding: CryptoJS.pad.Pkcs7
     });
     let encrypted_str = encrypted.toString();
     return encrypted_str;
 }
 
 function CryptoJSAesDecrypt(encrypted_json_string)
 {
     const input = "YXNuc2p!c2RranNkc2Rqd3VxaTMyOTg5";
     const substring = input.substring(0, 32);
     const sha256Hash = CryptoJS.SHA256(substring).toString();
     let _key = CryptoJS.enc.Hex.parse(sha256Hash);
     
     const nullString = String.fromCharCode(0).repeat(16);
     const hash = CryptoJS.SHA256(nullString).toString(CryptoJS.enc.Hex).substr(0, 32);
     const binaryHash = CryptoJS.enc.Hex.parse(hash);
 
     var decrypted = CryptoJS.AES.decrypt(
         encrypted_json_string, _key, {
         iv: binaryHash,
         mode: CryptoJS.mode.CBC,
         padding: CryptoJS.pad.Pkcs7
       }).toString(CryptoJS.enc.Utf8);
     
      return decrypted;
 }
  
  
  const areAllFieldsFilled = (mobile != "") && regMobile.test(mobile) && (fullname!="") ;

  useEffect(() => {
  
    setLoading(true);
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
        //console.log(result); 
        setLoading(false);
        const res = JSON.parse(result);
        let index = res.plan_details;
       
        setBike(index)
        // setLiv100(res[1]);
        // setLiv40(res[2]);
        //setPlan(res.plan_details);
        //console.log(bike)
        // console.log(liv100);
        // console.log(liv40)
      })
      .catch(error => console.log('error', error));

  }, [])

   useEffect(() => {
	  
	  fetch("https://geolocation-db.com/jsonp", {mode: 'no-cors'})
     .then(response=> response.text())
     .then((data)=>{
		 setDetails(data);
		 console.log(data);
	 })
	 .catch(error => console.log('error', error));
	 
  },[])
	  
  function  lead (link)  {
    
	var raw = { "token": "msl2n2bthl", "jobType": "investor_lead", "ip": ((details && details.IPv4) ? details.IPv4 : 'Not found'),
     "mobile_no":mobile, "name":fullname }
	 
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(raw),
         
    };
    
    fetch("http://localhost/investor_api/index.php/InvestorApis", requestOptions )
      .then(response => response.text())
      .then((result) => {})
      .catch(error => console.log('error', error));

	navigate(link);
	
  }



  return (
    <div>
      <Header />

      <section className="padding_50" >
        <div className="container p-3 mt-5 mb-3">
          <h4 className="subtitle mb-3">
            <span className="orange-circle" ></span>
            invest and get assured returns
          </h4>
          <div className="row">

            <h3 className="headings">
              Invest in Mooving EV assets and join the dream of making Greener
              and Cleaner India
            </h3>
     
            <div className="col-md-12 mt-5 mb-3">
              
            <div
                className={
                  toggleState === 1
                    ? "tab-content tabs active"
                    : " tab-content tabs"
                }
              >
                <div
                  role="tabpanel"
                  className="tab-pane in active"
                  id="Active"
                >
                  <div className="tab sub-tab" role="tabpanel">


                    <div className="tab-content tabs" >

                      <div className="row" >
                      {!loading ? <>
                        <div className="col-md-12 col-sm-12 d-flex">

                          {bike?.map((val, index) => (

                            <div className="asset " style={{ "margin": "30px" }} key={index}>

                              <div className="text-center">
                                <h2 style={{ color: "#666666", fontSize: "22px" }}>{val.title}</h2>
                                <img
                                  class="card-img-top m-0 p-0"
                                  src={val.image}
                                  alt="Card image cap"
                                  style={{ width: "auto", height: "150px" }}
                                />
                              </div>
                             
                              <h2
                                style={{
                                  fontSize: "16px",
                                  paddingTop: "0px",
                                  textAlign:"center"
                                }}
                              >
                                {val.content}
                              </h2>
                              
                              <ul >
                                <li style={{ fontSize: "16px" }} >

                                  ₹<br></br>{parseInt(val.amount).toLocaleString()} <span >Min investment</span>
                                </li>
                                <li style={{ fontSize: "16px" }}>
                                  {val.tenure}<br></br>Months <span>Tenure</span>
                                </li>
                                <li style={{ fontSize: "16px" }}>
                                  ₹<br></br>{parseInt(val.earn).toLocaleString()} <span>Return</span>
                                </li>
                              </ul>

                              <a
                                style={{ lineHeight: "37px" }}
                                className="btn-default mt-4 mb-3"
                                onClick={()=>{(handleOpen(val.link))}} 

                              >
                                View Detail
                              </a>


                              <Modal
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

                                    <div className="login-form">
                                      <h1>Welcome to Mooving</h1>
                                      <div className="enter-mobile">
                                        <form>

                                          <div className="enter-mobile">
                                            <div className="form-group row">
                                              <div className="col-sm-12">
                                                <input type="text" className="form-control-plaintext" id="staticEmail" placeholder="Enter Full Name"  onKeyDown={(e)=>{validate(e)} }   onChange={(e)=>{setName(e.target.value)}} />


                                              </div>

                                              <div className="col-sm-12 mt-3 mb-3">
                                                <input type="text" className="form-control-plaintext" id="staticEmail" maxlength="10"  placeholder="Enter Mobile Number" pattern="[0-9]+"
                                              
                                               
  onChange={(e)=>{setMobile(e.target.value)}} />


                                              </div>
                                              <button onClick={()=>{lead(link)}} disabled={ !areAllFieldsFilled} className="btn btn-default mb-2" >Submit</button>
                                            </div>
                                          </div>

                                          {/* {!visible &&
                                <div className="enter-otp">
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control-plaintext" id="staticEmail" placeholder="Enter OTP"/>
                                        </div>
                                    </div>
                                    <a type="" className="btn btn-default mb-2" onClick={()=>{navigate(val.link)}}>Continue</a>
                                </div> */}


                                        </form>
                                      </div>

                                    </div>

                                  </Box>
                                </Fade>
                              </Modal>
                            </div>
                          ))}  
                        </div> </>:<Loader/>}
                      </div>                            
                    </div>
                  </div>
                </div>
              </div>
            
            </div> 
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
