import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Alert } from 'react-bootstrap'
import { useState } from 'react';
import '../Kyc/Kycnew.css'
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
export default function Kycnew() {
  const navigate=useNavigate();
  const token = localStorage.getItem("token")?localStorage.getItem("token"):'';
  const investor=base64_decode( localStorage.getItem('investor_detail'));
 const [show , setShow]=useState(false);
  const investor_detail=JSON.parse(investor);
 const mobile=investor_detail.investor_details?.[0].mobile_no;
 
 const [is_address_approve, setAddressApprove]=useState(false);
 const [is_check_approve, setCheckApprove]=useState(false);
 const [is_gst_approve, setGstApprove]=useState(false);
 const [is_pancard_approve, setPancardApprove]=useState(false);
  
 useEffect(()=>{
	setAddressApprove(investor_detail.investor_details?.[0].is_address_approve);
	setCheckApprove(investor_detail.investor_details?.[0].is_check_approve);
	setGstApprove(investor_detail.investor_details?.[0].is_gst_approve);
	setPancardApprove(investor_detail.investor_details[0].is_pancard_approve);
  })
  
  console.log(investor_detail.investor_details[0]);
  
  const [loading , setLoading]=useState(false);
  
  const userType=localStorage.type;
  const [urlX, setUrl]=useState([]);
    
    /*{
        "pancard":"",
        "addressProof":"",
        "gstCertificate":"",
        "cheque":"",
    }*/
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
 
  const submit=()=>{
    
	var raw = { "jobType":"kyc_submitted",
    "token":token,
    "pancard":urlX['pancard'],
    "addressProof":urlX['addressProof'],
    "gstCertificate":urlX['gstCertificate'],
    "cheque":urlX['cheque'],
    "mobile_no" :mobile
    }
    
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
    .then((result) =>{
       const res=JSON.parse(result);
      console.log(result);
      if(parseInt(res.status)==200){
        navigate("/agreement");
    }
    else{
      setShow(true);
    }
    // navigate("/agreement");
    })
    
    .catch(error => console.log('error', error));
    
    // API Call End
   
    
              
   }
        
  
  
   
const getImage=({target})=> {
   
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
        //console.log(base64img)
        //console.log(imgPath);

    
        //  setFile(result)
         // setFileName(target.files[0].name)
//API Call

var raw =   {"jobType":"get_image",
"image_name": base64img,
"value":image_name,
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
  
    urlX[itmName]=imgPath;
    
    setUrl(urlX)
   // console.log(url);
})

.catch(error => console.log('error', error));

// API Call End

          
       }
    })
};
  return (
    <div>
       <Header/>
       <div className='col-md-12 mt-5 mb-5'>
            <div className="container-fluid">
                <h4 className="subtitle">
                    <span className="orange-circle" ></span>
                    Complete KYC
                </h4>
              
                <h3 className='headings mt-3' >Get started - KYC  Process</h3>
                
                <div className=' box col-md-12 d-flex mt-5' style={{ backgroundColor:"rgb(248, 248, 248)"}}>
            
                    <div className='container documents-upload full mt-2 m-5'>
                    {show && <div style={{backgroundColor:"transparent",textAlign:"center", color:"#f47920" , fontWeight:"600" , fontSize:"19px" , marginTop:"20px"}} >
                        All documents are required.
          
        </div>}
                        <h4 className='subheading'>Documents Upload</h4>
                        <form>
							{(is_pancard_approve != 1) ? <>
                            <div className="form-group" >
                                <label className="exampleInputEmail1" >PAN Card</label><br/>
                                <input type="file" className="form-control-file" id="pancard" name="pancard"  onChange={getImage} />
                                 <input type="hidden" value={urlX['pancard']} name="pancard_path" ></input> 
                            </div></> : ''}
							
							{(is_address_approve != 1) ? <>
                            <div className="form-group">
                                <label className="exampleInputEmail1">Address Proof</label><br/>
                                <input type="file" className="form-control-file" id="addressProof" name="addressProof" onChange={getImage} />
                                <input type="hidden" value={urlX['addressProof']} name="addressProof_path" ></input> 
                            </div></> : ''}
							
							{(is_gst_approve != 1) ? <>
                            <div className="form-group">
                                <label className="exampleInputEmail1">GST Certificate</label><br/>
                                <input type="file" className="form-control-file" id="gstCertificate" name="gstCertificate" onChange={getImage}/>
                                <input type="hidden" value={urlX['gstCertificate']} name="gstCertificate_path" ></input>                            
                            </div></> : ''}
							
							{(is_check_approve != 1) ? <>
                            <div className="form-group">
                                <label className="exampleInputEmail1">Cancelled Cheque</label><br/>
                                <input type="file" className="form-control-file" id="cheque" name="cheque" onChange={getImage} />
                                <input type="hidden" value={urlX['cheque']} name="cheque_path" ></input> 
							</div></> : ''}
							
                            <div style={{width:"25%", margin:"auto" }} className="mt-5 d-flex">
                                <button type="button" className='btn-default ' onClick={submit}>SUBMIT</button>
                            
                            </div>
                        </form>
                    <div>
                </div>
            </div>
                                    
        </div>
        </div>                   
    </div>
       <Footer/>
</div>
  )
}
