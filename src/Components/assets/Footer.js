import React from 'react'
import './footer.css';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';



export default function Header() {
  const navigate=useNavigate();
  return (
    <div>
         

         <footer className="footer wow fadeInUp animated" data-wow-delay="900ms">
        <div className="container">
            <div className="row" >
                <div className="col-md-3">
                    {/* <!-- ===========================
    						Footer About
    					 =========================== --> */}
                    <div className="footer-about">
                        <a href="#" className="footer-about-logo">
                            <img src="img/logo-1.png" alt="Logo"/>
                        </a>
                    </div>
                </div>
                <div className="col-md-3 footer-view-controller">
                    <div className="footer-nav">
                        <h6 className="footer-subtitle">Get in Touch</h6>
                        <div style={{color:"#bbbbbb"}}>
                        <p style={{paddingBottom:"25px"}}>Plot No 221, Udyog Vihar Phase 1, Udyog Vihar, Sector 20, Gurugram, Haryana 122016</p>
<p style={{margin:"0 0 25px"}}><i class="fa fa-phone" style={{color: "#fff"}}></i>&nbsp; &nbsp;+(91) 7045-011-110</p>
<p><a style={{color: "#fff"}} href="mail:contact@mooving.com"><i class="fa fa-envelope"></i>&nbsp; &nbsp;Contact@mooving.com</a></p>
</div>
                      
                    </div>
                </div>
                <div className="col-md-3 footer-view-controller">
                    <div className="footer-nav">
                        <div className="stores-list">
                            <h6 className="footer-subtitle">Group Websites</h6>
                            <ul>
                                <li><a href="https://www.sar-group.com/home"><i className="fa fa-solid fa-angle-double-right" /> SAR GROUP</a></li>
                                <li><a href="https://www.livguard.com/"><i className="fa fa-solid fa-angle-double-right"></i> Livguard</a></li>
                                <li><a href="https://www.lime.com/"><i className="fa fa-solid fa-angle-double-right"></i> Lime</a></li>
                                <li><a href="https://livpure.com/"><i className="fa fa-solid fa-angle-double-right"></i> Livpure</a></li>
                                <li><a href="https://www.livfast.in/"> <i className="fa fa-solid fa-angle-double-right"></i> Livfast</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 footer-view-controller">
                    <div className="footer-nav">
                        <h6 className="footer-subtitle">Policies</h6>
                        <ul>
                           
                            <li><a href="" onClick={()=>{navigate("/returnrefund")}}><i className='fa fa-solid fa-angle-double-right' ></i> Return &amp; Refund Policies</a></li>
                            <li><a href="" onClick={()=>{navigate("/returnpolicy")}}><i className="fa fa-solid fa-angle-double-right" ></i> Sales Return</a></li>
                            <li><a href=""  onClick={()=>{navigate("/termsofsale")}}><i className="fa fa-solid fa-angle-double-right"></i> Terms of Sales</a></li>
                            <li><a href="" onClick={()=>{navigate("/termsofuse")}}><i className="fa fa-solid fa-angle-double-right" ></i> Terms of Use</a></li>
                            <li><a href=""><i className="fa fa-solid fa-angle-double-right"></i> Service</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    

    <section className="copyright wow fadeInUp animated" data-wow-delay="1500ms">
        <div className="container">
            <div className="row" >
                <div className="col-md-6">
                    <div className="copyright-text">
                        <p style={{color:"#fff"}}>Copyright © 2022 Mooving, All Rights Reserved.
                    </p></div>
                </div>
                <div className="col-md-6">
                    <div className="brand-logo">
		    			<ul style={{display:"flex"}}>
                            <li>
                                <a>
                                    <i className="fa fa-brands fa-facebook"></i>
                                </a>
                            </li>
                            <li> 
                                <a>
                                    <i className=" fa fa-brands fa-twitter"></i>
                                </a>
                            </li>
                            <li> 
                                <a>
                                    <i className="fa fa-brands fa-instagram"></i>
                                </a>
                            </li>
                            <li> 
                                <a>
                                    <i className="fa fa-brands fa-youtube"></i>
                                </a>
                            </li>
                           
                        
	    			</ul></div>
                </div>
            </div>
        </div>
    </section>
    <a id="scrollUp" href="#top" style={{position: "fixed", zIndex: "214748364", display: "block"}}><i className="fa fa-thin fa-angle-up" style={{width:"1em" , lineHeight:"1em" ,fontSize:"150%" , textAlign:"center" ,marginLeft:"0.1rem"}} aria-hidden="true"></i></a>
    </div>
  )
}
