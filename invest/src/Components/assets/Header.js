import React, { useEffect, useState } from 'react'
import './header.css';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

export default function Header() {
	const [color , setColor]=useState(false);
	const navigate=useNavigate();
	
	let name=localStorage.getItem('investor_detail')?localStorage.getItem('investor_detail'):'';
	
	let investor_detail={"name":"","profile_image":""};	
	if(name!=''){
		let investor=base64_decode(name);
		investor_detail=JSON.parse(investor);
		//console.log(investor_detail.investor_details?.[0].type);
	}
	else{

	}

		// let name=localStorage.getItem('investor_detail')?localStorage.getItem('investor_detail'):'';
	// var investor_detail={"name":"","profile_image":""};
	
	// if(name!=''){
	// 	let investor=base64_decode(name);
	// 	 investor_detail=JSON.parse(investor);
	// 	console.log(investor_detail.investor_details[0].profile_image);
	// }
	function logout(){
	
		var raw = {"token":localStorage.getItem("token"),"jobType":"logout"};
		var requestOptions = {
		 //  mode: 'no-cors',
		   method: 'POST',
		   headers: {
			 'Content-Type': 'application/json'
		 },
		 body: JSON.stringify(raw),
	 //    redirect: 'follow'
		 };
		 
		fetch("http://localhost/investor_api/index.php/InvestorApis", requestOptions)
		 .then(response => response.text())
		 .then(result =>{
		   localStorage.clear();
		   navigate("/")})

		   .catch(error => console.log('error', error));
		
	}
	const changeBg=()=>{
		if(window.scrollY>=250){
			setColor(true);
		}
		else{
			setColor(false);
		}
		
	}
	window.addEventListener("scroll", changeBg)

	function RedirectHome(){
	  window.location.href = 'https://www.mooving.com';
	  return null;
	}
  
  return (
	<div>
	  <section className='banner'>
		 
	  
		<div id="main-menu-sticky-wrapper" className={color? "stic": "sticky-wrapper"} style={{height:"110px"}} >
			<div id="main-menu" className="sticker-nav">
			<div className="container-fluid">
			
				<div className="row">
				
					<div className="col-lg-2 col-md-3">
						<div className="logo">
							<img src="img/logo-1.png" alt="Logo"/>
						</div>
					</div>
					<div className="col-2 col-md-6 col-lg-7 ">
						<div className="menu-container wd-megamenu">
							<div className="menu">
								<a href="#" target="_blank" className="menu-mobile"> <i className=""></i></a><ul className="wd-megamenu-ul" style={{display:"flex"}}>
									<li><a className="main-menu-list" onClick={()=>{((investor_detail.investor_details?.[0].type == 'Admin') ? navigate('/dashboard') : RedirectHome())}} > Home </a></li>
									
									{(!investor_detail || investor_detail.investor_details?.[0].type != 'Admin') ? <>
									<li><a className="main-menu-list" target="_blank" onClick={()=>{navigate('/')}}>Deals</a></li>
									</> : ''}
									{/* <li><a className="main-menu-list" onClick={()=>{navigate('/wal')}}>Wallet</a></li> */}
								</ul>
							</div>
						</div>
					</div>
					<div className="col-lg-3">
						<ul className="login" style={{display:"flex"}}>
						 { localStorage.getItem("token") ? <>
						 <li>
							<img  style={{height:"80px" , width:"auto" , padding:"20px"}} src={investor_detail.investor_details?.[0].profile_image!=""? investor_detail.investor_details?.[0].profile_image : "../avatar.png"} className="img-responsive" />
							</li>
							 <li><a onClick={()=>{((investor_detail.investor_details?.[0].type == 'Admin') ? navigate('/dashboard') : navigate('/investor'))}}>{investor_detail.investor_details?.[0].full_name}</a></li>
							 <li><a onClick={()=>{logout()}}>LOGOUT</a></li></>
							 :<>
						 <li><a href="" onClick={()=>{navigate('/login' )}}><i className="fa fa-sign-in" ></i>Login</a></li> 
							<li><a href="" onClick={()=>{navigate('/signup')}}><i className='fa fa-solid fa-user-plus' ></i>SignUP</a></li> 
							</>}
						</ul>
					</div>
				
				
			
		</div>
		</div></div>
        
		</div>
		
	</section>
	
	</div>
  )
}


//{investor_detail.investor_details[0].profile_image!=""? investor_detail.investor_details[0].profile_image : "../avatar.png"}