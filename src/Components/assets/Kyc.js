import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import styles from './kyc.module.css';
import Header from './Header';
import Footer from "./Footer";

import { Navigate, useNavigate} from 'react-router-dom';
import { style } from '@mui/system';


export default function Kyc() {
    const navigate=useNavigate();
    const [toggleState , setToggleState]=useState(1);
    const toggleTab=(index)=>{
       setToggleState(index);
    }
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
  return (

    <div>
        <Header/>
            {/* <section className="page-breadcrumb">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="home.php">Home</a></li>
                            <li className="breadcrumb-item"><a href="asset-detail.php">Asset</a></li>
                            <li className="breadcrumb-item"><a href="assets.php"
                            
                    >Complete KYC</a></li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </section> */}

    <section style={{backgroundColor:"#EDF7FF" , width:"100%" , height:"100%" , padding:"50px"}}>
        <div id="content" >
            <div className="container-full">
                {/* <!-- container Starts --> */}
                <div className="col-md-12">
                    <div className="row justify-content-md-center">
                        {/* <!-- col-md-12 Starts --> */}
                        <div className="col-md-9">
                            <div className={styles.box}>
                                {/* <!-- box Starts --> */}
                                <div className={styles.boxHeader}>
                                    {/* <!-- box-header Starts --> */}
                                    <div style={{textAlign: "center"}}>
                                        <p className="login-box-msg"><strong style={{color:"white" , fontFamily:"'Nunito', sans-serif"}}>Complete KYC</strong></p>
                                    </div>
                                </div>
                                {/* <!-- box-header Ends --> */}

                                <div className={styles.tab} role="tabpanel">
                                    {/* <!-- Nav tabs --> */}
                                    <ul className={` ${styles.nav} ${styles.navTabs}`} role="tablist" style={{display:"flex"}}>
                                    <li role="presentation"><a href="#Section1" className={toggleState===1 ?"active" : " "} aria-controls="profile" onClick={()=>toggleTab(1)} onSubmit={(e)=>{e.preventDefault()}}role="tab" data-toggle="tab">Personal Details</a></li>
                                        <li role="presentation"><a href="#Section2" className={toggleState===2 ?"active" : " "} aria-controls="profile" onClick={()=>toggleTab(2)} onSubmit={(e)=>{e.preventDefault()}}role="tab" data-toggle="tab">Bank <br/>details</a></li>
                                        <li role="presentation"><a href="#Section3" className={toggleState===3 ?"active" : " "} aria-controls="messages" onClick={()=>toggleTab(3)}  onSubmit={(e)=>{e.preventDefault()}} role="tab" data-toggle="tab">Document Upload</a></li>
                                        <li role="presentation"><a href="#Section4" className={toggleState===4 ?"active" : " "}aria-controls="messages" onClick={()=>toggleTab(4)}  onSubmit={(e)=>{e.preventDefault()}} role="tab" data-toggle="tab">MSME<br/>Info</a></li>
                                    </ul>
                                    {/* <!-- Tab panes --> */}
                                    <div className={styles.tabContent} style={{backgroundColor:"#edf7ff"}}>
                                        <div role="tabpanel" className={toggleState===1 ?"active" : "disabled"} id="Active">
                                            <form>
                                                <div className="form-group">
                                                 <label>Full Name</label> 
                                                    <input required type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Mobile Number</label>
                                                    <input required type="tel" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""/>
                                                </div>
                                                <div className="form-group">
                                                    <label >Address</label>
                                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""/>
                                                </div>
                                                <div className="form-group">
                                                    <label >Postal code</label>
                                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""/>
                                                </div>
                                            </form>
                                            <div className={styles.buttonsBottom}>
                                                <button className="btn-default button-left next">Next</button>
                                            </div>
                                        </div>
                                        <div role="tabpanel"  className={ toggleState===2 ?"active tab-pane" : "disabled"} id="Active" >
                                            <form >
                                                <div className="form-group">
                                                    <label for="exampleFormControlSelect2">Bank*</label>
                                                    <select required className="form-control" id="exampleFormControlSelect2"  >
                                                        <option>HDFC</option>
                                                        <option>ICICI</option>
                                                        <option>Kotak Mahindra</option>
                                                        <option>Canara Bank</option>
                                                        <option>IDFC Bank</option>
                                                    </select>
                                                </div> 
                                                 <div className="form-group" >
                                                    <label for="exampleInputEmail1">Account Number*</label>
                                                    <input required type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""/>
                                                </div>
                                                <div className="form-group">
                                                    <label for="exampleInputEmail1">Account Holder Name*</label>
                                                    <input required type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""/>
                                                </div>
                                                <div className="form-group">
                                                    <label for="exampleInputEmail1">IFSC code*</label>
                                                    <input required type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""/>
                                                </div>
                                                <div className="form-group">
                                                    <label for="exampleInputEmail1">Branch</label>
                                                    <input required type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""/>
                                                </div>
                                            </form>
                                            <div className={styles.buttonsBottom}>
                                                <button className="btn-default button-right">Previous</button>
                                                <button className="btn-default button-left"  style={{float:"right"}}>Next</button>
                                            </div>
  </div>  



                                        <div role="tabpanel" className={toggleState===3 ?"active" : "disabled"} id="Active">
                                            <form>
                                                <form>
                                                    <div className="form-group" >
                                                        <label for="exampleFormControlFile1" >PAN Card*</label><br/>
                                                        <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                                                    </div>
                
                                                    <div className="form-group">
                                                        <label for="exampleFormControlFile1">Aadhar Card*</label><br/>
                                                        <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="exampleFormControlFile1">GST Certificate</label><br/>
                                                        <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                                                    </div>
                                                </form>
                                            </form>
                                            <div className={styles.buttonsBottom}>
                                                <button className="btn-default button-right" >Previous</button>
                                                <button className="btn-default button-left" style={{float:"right"}}>Next</button>
                                            </div>
                                        </div>

                                        <div role="tabpanel" className={toggleState===4 ?"content" : "disabled"} id="Active">
                                            <form>
                                                <form>
                                                    <div className="form-group">
                                                        <label for="exampleFormControlFile1">MSME Certificate*</label><br/>
                                                        <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="exampleInputEmail1">CIN</label><br/>
                                                        <input required type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""/>
                                                    </div>
                
                                                   
                                                </form>
                                            </form>
                                            <div className={styles.buttonsBottom}>
                                                <button className="btn-default button-right">Previous</button>
                                                <button className="btn-default button-left"    style={{float:"right"}} onClick={()=>navigate('/sidebar')}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- box Ends --> */}
                        </div>
                    </div>
                    {/* <!-- col-md-12 Ends --> */}
                </div>
                {/* <!-- container Ends --> */}
            </div>
        </div>
        {/* <!-- content Ends --> */}
    </section>
    <Footer/>
    </div>
  )
}
