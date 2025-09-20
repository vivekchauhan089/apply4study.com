import React from 'react'
import './Checkout.css'
import Alert from 'react-bootstrap/Alert';
import { useEffect } from 'react';
import Footer from '../assets/Footer';
import Header from '../assets/Header';
export default function Checkout() {
    const [toggleState , setToggleState]=React.useState(1);
    const [show,setShow]=React.useState(true);
    const toggleTab=(index)=>{
       setToggleState(index);
    console.log(index);
    };
    

useEffect(()=>{
   setTimeout(() => {
    setShow(false);
  
  }, 3000)});
    
   //  useEffect(() => {
   //      window.scrollTo(0, 0)
   //    }, [])
  return (
    <div>
      <Header/>
     
             <div class="box" style={{backgroundColor:"#efefef"}}>
             {show&& <Alert style={{backgroundColor:"#f47920", color:"#fff" , fontWeight:"500" , fontSize:"18px"}} >
           Payment Link will be sent shortly.
        </Alert>}
   <div class="container p-3 p-4 " >
  
      <div class="row justify-content-md-center">
         <div class="col-md-6">
            <div class="card " style={{width:"55vw", right:"8%"}}>
               <div class="card-header add-shadow">

                  <ul role="tablist" class="nav nav-pills mb-3 wd-tab-menu" >
                     <li class="nav-item"> <button data-toggle="pill" className={toggleState===1 ?"nav-link active" : "nav-link"} onClick={()=>toggleTab(1)}> <i class="fa fa-credit-card mr-2" ></i> Credit Card </button> </li>
                     <li class="nav-item"> <button data-toggle="pill" className={toggleState===2 ?"nav-link active" : "nav-link"} onClick={()=>toggleTab(2)}> <i class="fa fa-paypal mr-2"></i> Paypal </button> </li>
                     <li class="nav-item"> <button data-toggle="pill"  className={toggleState===3 ?"nav-link active" : "nav-link"} onClick={()=>toggleTab(3)}> <i class="fa fa-bank mr-2"></i> Net Banking </button> </li>
                  </ul>

                 
                  <div class="tab-content">
                   
                     <div id="credit-card" class="tab-pane fade active show " className={toggleState===1 ?"active" : "disabled"}>
                        <form role="form" onSubmit={(e)=>{e.preventDefault()}}>
                           <div class="form-group">
                              <label for="username">
                                 <h6>Card Owner</h6>
                              </label>
                              <input type="text" name="username" placeholder="Card Owner Name" required="" class="form-control "/>
                           </div>
                           <div class="form-group">
                              <label for="cardNumber">
                                 <h6>Card number</h6>
                              </label>
                              <div class="input-group">
                                 <input type="text" name="cardNumber" placeholder="Valid card number" class="form-control " required=""/>
                                 <div class="input-group-addon">
                                    <span class="input-group-text text-muted">
                                       <i class="fa fa-cc-visa mx-1"></i> <i class="fa fa-cc-mastercard mx-1"></i> <i class="fa fa-cc-amex mx-1"></i> </span>
                                 </div>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col-sm-8">
                                 <div class="form-group">
                                    <label>
                                       <span class="hidden-xs">
                                          <h6>Expiration Date</h6>
                                       </span>
                                    </label>
                                    <div class="">
                                       <div class="form-group" style={{width:"48%",display:"inline-block"}}>
                                          <label for="firstname" class="sr-only"></label>
                                          <input type="number" placeholder="MM" name="" class="form-control" required=""/>
                                       </div>
                                       <div class="form-group" style={{width:"48%",display:"inline-block"}}>
                                          <label for="lastname" class="sr-only"></label>
                                          <input type="number" placeholder="YY" name="" class="form-control" required=""/>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-4">
                                 <div class="form-group mb-4">
                                    <label data-toggle="tooltip" title="" data-original-title="Three digit CV code on the back of your card">
                                       <h6>CVV <i class="fa fa-question-circle d-inline"></i></h6>
                                    </label>
                                    <input type="text" required="" class="form-control"/>
                                 </div>
                              </div>
                           </div>
                           <div class="card-footer"> <button type="button"  class="subscribe btn btn-primary btn-block shadow-sm btn-default"> Confirm Payment </button>
                        
                     </div></form>
                  </div>
                  
                  <div id="paypal" class="tab-pane fade" className={toggleState===2 ?"active" : "disabled"}>
                     <h6 class="pb-2">Select your paypal account type</h6>
                     <div class="form-group "> <label class="radio-inline"> <input type="radio" name="optradio"/> Domestic </label> <label class="radio-inline"> <input type="radio" name="optradio" class="ml-5"/>International </label></div>
                     <p> <button type="button" class="btn btn-primary btn-default"><i class="fa fa-paypal mr-2"></i> Log into my Paypal</button> </p>
                     <p class="text-muted"> Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order. </p>
                  </div>
               
                  <div id="net-banking" class="tab-pane fade" className={toggleState===3 ?"active" : "disabled"}>
                     <div class="form-group ">
                        <label for="Select Your Bank">
                           <h6>Select your Bank</h6>
                        </label>
                        <select class="form-control" id="ccmonth">
                           <option value="" selected="" disabled="">--Please select your Bank--</option>
                           <option>Bank 1</option>
                           <option>Bank 2</option>
                           <option>Bank 3</option>
                           <option>Bank 4</option>
                           <option>Bank 5</option>
                           <option>Bank 6</option>
                           <option>Bank 7</option>
                           <option>Bank 8</option>
                           <option>Bank 9</option>
                           <option>Bank 10</option>
                        </select>
                     </div>
                     <div class="form-group">
                        <p> <button type="button" class="btn btn-primary btn-default" style={{marginTop:"17px"}}><i class="fa fa-bank mr-2"></i> Proceed Payment</button> </p>
                     </div>
                     <p class="text-muted">Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order. </p>
                  </div>
                 
                  <div id="offline" class="tab-pane fade">
                     <br/>
                     <p>
                        {/* <a class="subscribe btn btn-primary btn-block shadow-sm btn-default"
<b>Notice</b>:  Undefined variable: customer_id in <b>/var/www/html/mooving_invest/pay_offline.php</b> on line <b>163</b><br />
">Click here to pay offline</a> */}
                     </p>
                  </div>
                  
               </div>
            </div>
         </div></div></div></div>
      </div>
      <Footer/>
    </div>
  )
}
