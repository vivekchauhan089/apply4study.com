//import { WindowSharp } from '@mui/icons-material';
import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


export default function Documents() {
  const navigate=useNavigate();
  
  function viewAgreement() {
    
    if (localStorage.getItem("token")) {   
		navigate("/agreement");
	} else { 
		fetch('agreement.pdf').then(response => {
          response.blob().then(blob => {
              // Creating new object of PDF file
              const fileURL = window.URL.createObjectURL(blob);
              // Setting various property values
              //let alink = document.createElement('a');
              //alink.href = fileURL;
              //alink.download = 'agreement.pdf';
              //alink.open();
			  window.open(fileURL, "_blank");
          })
		}) 
	}

  }
  
  return (
    <div style={{backgroundColor:"#F8F8F8"}}>
    
         <h3 className='headings mt-3' style={{paddingTop:"30px"}} >Documents</h3> 
         {/* <p
        style={{
          textAlign: "center",
          color: "#343a40",
          fontSize: "16px",
          width: "800px",
          marginLeft: "10rem",
          marginBottom: "30px",
        }}
      >
         subtitle
      </p> */}

      <div class="container mt-5">
  <div class="row">
    <div class="col">
    <Button download-btnsize="lg" className='download-btn mb-4'  onClick={()=>{viewAgreement()}}>Sample sale & lease agreement</Button>{' '}
         
         
    </div>
    <div class="col">    <Button   size="lg" className='download-btn' style={{float:"right"}} onClick={()=>{window.scroll(0, 0)}}>Return calculator</Button>{' '}
    </div>
  </div>
  </div>
          {/* <h4 >Quick Links for you to download</h4>  */}
          {/* <div className='col-md-'
          <Button variant="primary"  download-btnsize="lg"className='download-btn'>Sample sale & lease agreement<i class="fa fa-download" aria-hidden="true"></i></Button>{' '}
          
          <Button variant="primary"  size="lg" className='download-btn' style={{float:"right"}}>Return calculator<i class="fa fa-download" aria-hidden="true"></i></Button>{' '} */}
    </div>
    
  )
}
