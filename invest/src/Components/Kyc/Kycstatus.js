import { useScroll } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import Loader from '../Loader';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Kycstatus() {

  const [loading , setLoading]=useState(false);
  const investor=base64_decode( localStorage.getItem('investor_detail'));
  const token = localStorage.getItem("token")?localStorage.getItem("token"):'';
  const investor_detail=JSON.parse(investor);
  const mobile=investor_detail.investor_details?.[0].mobile_no;
  const [imageData , setImageData]=useState([]);

    useEffect(()=>{
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
		  localStorage.setItem('investor_detail', base64_encode(JSON.stringify(res)));
          let index=res.investor_details;
			
          setImageData(index?.[0]);
       
      })
           
        .catch(error => console.log('error', error));
      
      

    },[])
    const navigate=useNavigate();
  return (
    <div>
      {!loading?<>
              <div class="kyc_status">
    {imageData.pancard && imageData.gst &&imageData.address_proof && imageData.cheque && (imageData.kyc_status == 'approved') ?
    <h4>KYC Status : <span>Approved</span></h4> :<><h4>KYC Status : <span style={{backgroundColor:"orange"}}>Pending</span></h4><div></div></>}
</div>

<Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Document</th>
                              <th>Added On</th>
							  <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Pan Card</td>
                              <td>{imageData?.kyc_image_date? imageData?.kyc_image_date:"Not Found"}</td>
                              {/* //<td>{singleInvestor?.[0].kyc_image_date? singleInvestor?.[0].kyc_image_date:"Not Found"}</td> */}
							  <td>{imageData.is_pancard_approve == 1 ? 'Approved' : (imageData.is_pancard_approve == 2 ? 'Rejected' : 'Pending')}</td>	
						   <td>
                             {imageData.pancard ? <>
                             {/* <a href={imageData.pancard?imageData.pancard:""}  class="btn btn-primary btn-default" download="custom-filename.jpg" ><i className="fa fa-download" ></i></a>  */}
                              <a href={imageData.pancard?imageData.pancard:""} class="btn btn-primary btn-default" target="_blank" ><i class="fa fa-eye"></i></a>
							  {imageData.is_pancard_approve == 2 ? <>
							  <button className='btn btn-default' onClick={()=>{navigate("/Kycnew")}}>Upload</button>
							  </> : ''}
                              </> :<button className='btn btn-default' onClick={()=>{navigate("/Kycnew")}}>Upload</button> } </td>

                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Address Proof</td>
                              <td>{imageData?.kyc_image_date? imageData?.kyc_image_date:"Not Found"}</td>
                              <td>{imageData.is_address_approve == 1 ? 'Approved' : (imageData.is_address_approve == 2 ? 'Rejected' : 'Pending')}</td>
							  <td>
                              {imageData.address_proof? <>
                              {/* <a href={imageData.address_proof ?imageData.address_proof :"www.google.com" }  class="btn btn-primary btn-default" download="custom-filename.jpg" ><i className="fa fa-download" ></i></a>  */}
                              <a  href={imageData.address_proof ?imageData.address_proof :"www.google.com" } class="btn btn-primary btn-default" target="_blank" ><i class="fa fa-eye"></i></a>
                              {imageData.is_address_approve == 2 ? <>
							  <button className='btn btn-default' onClick={()=>{navigate("/Kycnew")}}>Upload</button>
							  </> : ''}
							  </> :<button className='btn btn-default' onClick={()=>{navigate("/Kycnew")}}>Upload</button> } </td>
                             
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>GST Certificate</td>
                              <td>{imageData?.kyc_image_date?imageData?.kyc_image_date:"Not Found"}</td>
							  <td>{imageData.is_gst_approve == 1 ? 'Approved' : (imageData.is_gst_approve == 2 ? 'Rejected' : 'Pending')}</td>
                              <td>
                              {imageData.gst? <>
                                {/* <a href={imageData.gst ? imageData.gst:" "}  class="btn btn-primary btn-default" download="custom-filename.jpg" ><i className="fa fa-download" ></i></a>  */}
								<a href={imageData.gst ? imageData.gst:" "}  class="btn btn-primary btn-default" target="_blank" ><i class="fa fa-eye"></i></a>
                            {imageData.is_gst_approve == 2 ? <>
							  <button className='btn btn-default' onClick={()=>{navigate("/Kycnew")}}>Upload</button>
							  </> : ''}
							</> :<button className='btn btn-default' onClick={()=>{navigate("/Kycnew")}}>Upload</button> } </td> 
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>Cancelled Cheque</td>
                              <td>{imageData?.kyc_image_date?imageData?.kyc_image_date:"Not Found"}</td>
							  <td>{imageData.is_check_approve == 1 ? 'Approved' : (imageData.is_check_approve == 2 ? 'Rejected' : 'Pending')}</td>
                              <td>
                              {imageData.cheque? <>
                                {/* <a href={imageData.cheque?imageData.cheque:" "}  class="btn btn-primary btn-default" download="custom-filename.jpg" ><i className="fa fa-download" ></i></a>  */}
                                <a href={imageData.cheque? imageData.cheque :" "} class="btn btn-primary btn-default" target="_blank" ><i class="fa fa-eye"></i></a>
                                {imageData.is_check_approve == 2 ? <>
								<button className='btn btn-default' onClick={()=>{navigate("/Kycnew")}}>Upload</button>
								</> : ''}
								</> :<button className='btn btn-default' onClick={()=>{navigate("/Kycnew")}}>Upload</button> } </td>  
                            </tr>
                          </tbody>
                     </Table> 


            </>:<Loader/>}
            
            
    </div>
  )
}
