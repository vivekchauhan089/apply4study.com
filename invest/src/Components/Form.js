import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css';
import Header from './assets/Header';
import Footer from './assets/Footer';

export default function Form() {
    const navigate=useNavigate();
   
  return (
  
    <div>
        <Header/>
     

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
       
<div className='col-md-12 p-5'  style={{ backgroundColor: "#EDF7FF" , height:"100vh" }}>
        <div className="container " >
            <div className="row">
                <div className="col-md-12 mt-5 mb-5"   >
                    <div className="login-form">
                        <h1>Let's get you started</h1>
                        <div className="enter-mobile">
                            <form>
                                
                              <div className="enter-mobile">
                                    <div className="form-group row">
                                       <div className="col-sm-12">
                                            <input type="text" className="form-control-plaintext" id="staticEmail" placeholder="Enter Email"/>
                                        </div>
                                       
                                    </div>
                                </div>

                                
                                <div className="enter-otp">
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control-plaintext" id="staticEmail" placeholder="Enter"/>
                                        </div>
                                    </div>
                                    <a type="" className="btn btn-default mb-2" onClick={()=>{navigate('/checkout')}} >Continue</a>
                                </div>

                                
                            </form>
                        </div>
                      
                             
                    </div>
                    
                </div>
            </div>
        </div>
        </div>
        <Footer/>
        </div>
  

    
  )
}
