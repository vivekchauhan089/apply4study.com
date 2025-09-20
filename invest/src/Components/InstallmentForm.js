import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Installment-form.css';
import Header from './assets/Header';
import Footer from './assets/Footer';
import { useEffect } from 'react';
import { Alert } from '@mui/material';

export default function InstallmentForm() {
    const navigate = useNavigate();
   const [type , setType]=useState(" ");
   const [investorname , setName]=useState("");
   const [receivedDate , setDate]=useState("");
   const [id , setId]=useState("");
   const [ amount, setAmoumt]=useState("");
   const [method , setMethod]=useState("");
  const [order, setorder]=useState("");
   const [emiMonth , setEmiMonth]=useState("");
   const [emiAmount , setEmiAmount]=useState("");
  const [msg , setMsg]=useState("");
  const [show, setShow]=useState(false);
   let name;
   const handle=(e)=>{
    
     setType(e.target.value);
     name=e.target.value;
     localStorage.setItem("type", name);
    //  console.log(name);

   }
   useEffect(() => {
    window.scrollTo(0, 0)
    
  }, [])
  function submit(){
    
    var raw =   {"jobType": "installment",
    "token":"msl2n2bthl",
    "investor":investorname,
    "received_date":receivedDate,
    "transaction":id,
    "amount":amount,
    "method":method,
    "emi_month":emiMonth,
    "emi_amount":emiAmount}
    
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
        //  console.log(result); 
    const res=JSON.parse(result);
     
    
      console.log(res.msg);
      setMsg(res.msg);
      setShow(true);
      console.log(emiMonth);
       
    })
        
     .catch(error => console.log('error', error));
    //   navigate("/Kycnew");


    //console.log(amount);

}


    return (

        <div>


            {/* <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="logo">
                        <a href="home.php">
                            MOOVING
                        </a>
                    </div>
                </div>
            </div>
        </div>  */}

            <section className='main'  style={{ backgroundColor: "#000000" }}>
                <div className="container "  >
                    <div className="row">
                        <div className="col-md-12 mt-5 mb-5"   >


                            
                            <div className="login-form" style={{ width: "600px", height: "auto" }}>
                                <h1 style={{marginBottom:"10px"}}>Installment Detail</h1>
                                {show &&  <Alert style={{backgroundColor:"#f47920",color:"#fff" , fontWeight:"500" , fontSize:"16px" , marginTop:"20px"}}>
                                             {msg}
                                  </Alert>}
                                <div className="enter-mobile">
                                    <form>
                                        <div class="enter-type">
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                    <label className='naam' for="inputState" style={{ float: "left"}} >Investor Name</label>
                                                    <input type="text" className="form-control-plaintext mb-3" id="staticEmail" onChange={(e)=>{setName(e.target.value)}} placeholder='eg John' />
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="enter-mobile">
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                    <label className='naam' style={{ float: "left" }}>Date</label>
                                                    <input type="text" className="form-control-plaintext mb-3" id="staticEmail" onChange={(e)=>{setDate(e.target.value)}} placeholder='dd/mm/yyyy' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="enter-mobile">
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                    <label className='naam' style={{ float: "left" }}>Order ID</label>
                                                    <input type="text" className="form-control-plaintext mb-3" id="staticEmail" onChange={(e)=>{setorder(e.target.value)}} placeholder='' />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="enter-type">
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                    <label className='naam' for="inputState" style={{ float: "left"}} >Transaction ID</label>
                                                    <input type="text" className="form-control-plaintext mb-3" id="staticEmail" onChange={(e)=>{setId(e.target.value)}} placeholder='123456789' />
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="enter-mobile">
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                    <label className='naam' style={{ float: "left" }}>Amount</label>
                                                    <input type="text" className="form-control-plaintext mb-3" id="staticEmail" onChange={(e)=>{setAmoumt(e.target.value)}} placeholder='Rs' />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="enter-type">
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                    <label className='naam' for="inputState" style={{ float: "left"}} >Method</label>
                                                    <select id="inputState" class="form-control" style={{backgroundColor:"#eee" }}   onChange={(e)=>{setMethod(e.target.value)}} >
                                                        <option >Cash</option>
                                                        <option>Cheque</option>
                                                        <option>UPI</option>
                                                        <option>Payment Gateway</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="enter-mail">
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                    <label className='naam' style={{ float: "left" }}>Month</label>
                                                    <select id="inputState" class="form-control" style={{backgroundColor:"#eee" }}   onChange={(e)=>{setEmiMonth(e.target.value)}} >
                                                        <option>January 2021</option>
                                                        <option>February 2022</option>
                                                        <option>March 2022</option>
                                                        <option>April 2021</option>
                                                        <option>May 2021</option>
                                                        <option>June 2021</option>
                                                        <option>July 2022</option>
                                                        <option>August 2022</option>
                                                        <option>September 2022</option>
                                                        <option>October 2021</option>
                                                        <option>November 2021</option>
                                                        <option>December 2022</option>
                                                    </select>
                                                </div>

                                            </div>

                                        </div>
                                        <div className="enter-add">
                                            <div className="form-group row">
                                                <div className="col-sm-12">
                                                    <label className='naam' style={{ float: "left" }}>EMI Amount</label>
                                                    <input type="text" className="form-control-plaintext mb-3" id="staticEmail" onChange={(e)=>{setEmiAmount(e.target.value)}} placeholder='Rs' />
                                                </div>

                                            </div>

                                        </div>

                                        
                                    </form>
                                </div>

                                <div className='mt-4 '>
                                    <button className="btn btn-default" style={{width:"100%"}}  onClick={submit}>Submit</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

  
        </div>

    )
}
