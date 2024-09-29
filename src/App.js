import * as React from "react";
import Kyc from "./Components/assets/Kyc";
import Asset from "./Components/assets/Asset";
import Page_404 from "./Components/404/404";

import Signup from "./Components/Signup";
import AssetDetail from "./Components/assets/AssetDetail";
import Login from "./Components/Login";
import 'bootstrap/dist/css/bootstrap.css';
import InstallmentForm from "./Components/InstallmentForm";
import 'font-awesome/css/font-awesome.min.css';
import '../src/global.css';
import Loader from "./Components/Loader";
import Form from "./Components/Form";
import Agreement from "./Components/Agreement";
import Kycnew from "./Components/assets/Kycnew";
 import Checkout from "./Components/Wallet/Checkout";
 import Wallet from "./Components/Wallet/Wallet";
 import Livguard40 from "./Components/assets/Livguard40";

 import Use from "./Components/T&c/Use";
import Header from "./Components/assets/Header";
import Sales from "./Components/T&c/Sales";
import  Dashboard  from "./Components/commercial/Dashboard";
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from 'react-router-dom';
// import 'https://fonts.googleapis.com/css2?family=Nunito&display=swap';
import Sidebar from "./Components/Kyc/Sidebar";
import ReturnPolicy from "./Components/T&c/ReturnPolicy";
import ReturnRefund from "./Components/T&c/ReturnRefund";
import { useEffect } from "react";

function App(){
 
const isloggedin=localStorage.getItem("token");

  return (
    // <Sidebar/>
    // <Checkout/>
    //  <Wallet/>
    // <Header/>
    // <Asset/>
   
     <BrowserRouter>
       {/* <GifLoader
                loading={true}
                imageSrc=""
                
                overlayBackground="rgba(0,0,0,0.5)"
            /> */}
          <Routes>
            {/* <Route exact path='/' element={<App/>}/> */}
          
            <Route exact path='/' element={<Asset/>} /> 
            <Route exact path='/investor' element= {isloggedin ?<Sidebar/> :<Login/>} />
            <Route exact path='/payment_status' element={ isloggedin ?<Sidebar title="payment_status" /> :<Login/>}/>
            <Route exact path='/payment_detail' element={ isloggedin ?<Sidebar title="payment_detail" /> :<Login/>}/>
            <Route exact path='/kyc' element={ isloggedin ?<Sidebar title="kyc" /> :<Login/>}/> 
            <Route exact path='/investment_summery' element={<Sidebar title="investments" />}/> 
            <Route exact path='/agreementuser' element={ isloggedin ?<Sidebar title="agreementuser" /> :<Login/>}/> 
            <Route exact path='/faq' element={ isloggedin ?<Sidebar title="faq" /> :<Login/>}/> 
            <Route exact path='/raise-concern' element={ isloggedin ?<Sidebar title="raise-concern" /> :<Login/>}/> 
            <Route exact path='/faq' element={ isloggedin ?<Sidebar title="faq" /> :<Login/>}/> 
            <Route exact path='/front' element={ isloggedin ?<Sidebar title="front" /> :<Login/>}/> 
            <Route exact path='/investments' element={ isloggedin ?<Sidebar title="investments" /> :<Login/>}/> 
            <Route exact path='/invest-status' element={ isloggedin ?<Sidebar title="invest-status" /> :<Login/>}/> 
          
            
            <Route exact path='/loader' element={<Loader/>}/>
            <Route exact path='/dashboard' element={<Dashboard/>}/>
            <Route exact path='/checkout' element={<Checkout/>}/>
            <Route exact path='/wal' element={<Wallet/>}/>
            <Route exact path='/assetdetail' element={<AssetDetail title="E-bikes" />}/>
            <Route exact path='/livguard100' element={<AssetDetail  title="Livguard100"/>}/>
            <Route exact path='/livguard40' element={<AssetDetail  title="Livguard40"/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/agreement' element={ isloggedin ? <Agreement/> :<Login/>}/>
            <Route exact path='/Kycnew'  element={isloggedin ?<Kycnew/> : <Login/>}/>
            <Route exact path='/form' element={<Form/>}/>
            <Route exact path='/termsofuse' element={<Use/>}/>
            <Route exact path='/termsofsale' element={<Sales/>}/>
            <Route exact path='/returnpolicy' element={<ReturnPolicy/>}/>
            <Route exact path='/returnrefund' element={<ReturnRefund/>}/>
            <Route exact path='/installmentform' element={<InstallmentForm/>}/>
            <Route exact path='/' element={<Asset/>} /> 
             <Route exact path='/signup' element={<Signup/>}/>
             <Route exact path='/login' element={<Login/>}/> 
             <Route exact path="/:user" element={<Page_404/>} />
            
          </Routes>
          </BrowserRouter>
     
      
  );
}

export default App;
