import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/AssetDetail.css";
import Table from 'react-bootstrap/Table'
import { Slider } from "@mui/material";
import styled from "styled-components";
import RangeSlider from 'react-bootstrap-range-slider';
import Footer from "./Footer";
import Header from "./Header";
import Accordion from "react-bootstrap/Accordion";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Faq from "./Faq";
import { useEffect } from "react";
import Documents from "./Documents";
import { Navigate, useNavigate } from "react-router-dom";


export default function Livguard40() {
 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [value, setValue] = React.useState(1);
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    const handleChange = (event, newValue) => {
      if (typeof newValue === 'number') {
        setValue(newValue);
      }
    };
    const rate=3.5;
    const gst=18;
     const price=value*53000;
     const t=36;
    const basicAmount=(price/(1+gst/100));
    const totalGstAmount=price*(gst/100);
    const  payout=(rate/100)*basicAmount;
    const gstAmount=payout*(gst/100);
    const emi=payout+gstAmount;
    
    const total=Math.round((emi*t)+(price*0.1));
    const earn=Math.round(total-price);
  const style = {
    position: "absolute",
    top: "42%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 250,
    textAlign: "center",
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  

  function valuetext(value) {
    return `${value}`;
  }
  
  const navigate = useNavigate();
  return (
    <div>
      <Header />

      <section className="padding_50" style={{ backgroundColor: "" }}>
        <div className="container pt-3 mt-3 pb-3 mb-3">
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <div className="asset-detail">
                <div className="tags" >
                  <ul>
                    <li>Battery</li>
                    <li>SAR</li>
                    <li>Leasing</li>
                    <li>Lithium ion</li>
                  
                  </ul>
                </div>
                <h2>Furnish your portfolio with combo deal!</h2>
                <div className="asset-image">
                  <img src="/xyz.png" alt="Logo" />
                </div>
                <div className="row">
                  <div className="col-md-2 col-sm-6">
                    <div className="asset-info">
                      <h3>21%</h3>
                      <p>Return(IRR)</p>
                      <a href="" style={{ color: "#f47920" }}>
                        What is IRR?
                      </a>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-6">
                    <div className="asset-info">
                      <h3>36 Months</h3>
                      <span>tenure</span>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-6">
                    <div className="asset-info">
                      <h3>Monthly</h3>
                      <span>Payout</span>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-6">
                    <div className="asset-info">
                      <h3>K</h3>
                      <span>Min Investment</span>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="asset-info">
                      <h3 className="progress-title">Re sale value</h3>
                      <div
                        className="progress"
                        style={{ marginTop: "7px", width: "80%" }}
                      >
                        <div
                          className="progress-bar"
                          style={{ width: "10%", background: "#f47920" }}
                        >
                          <div className="progress-value">10%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-4 col-sm-12"
              
            >
              <div className="investment-detail">
                <h3>Investment Calculator</h3>
                <p >Select the number of 40AH Battery </p>
                <div style={{display:"flex" , justifyContent:"space-between"}} className="mt-4">
                <p class="min" >Min</p>
             
                <span id="non-linear-slider"className="range-value" gutterBottom >
        {value} </span>
        <p class="max" >Max</p>
        
       </div>
        
     
      <Slider
        value={value}
        min={1}
        style={{color:"#273c75"}}
        step={1}
        max={100}
        defaultValue={3}
        // scale={calculateValue}
        // getAriaValueText={valueLabelFormat}
        // valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        // valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
                              <ul className="deposit-summary">
                <li>
                    Total Investments
                    <span className="text-left">₹ {price}</span>
                  </li>
                  
                  <li>
                    Pre Tax Returns
                    <span className="text-left">₹ {total}</span>
                  </li>
                  <li>
                    Earn
                    <span className="text-left">₹ {earn}</span>
                  </li>
                  <li>
                    Tax Applicable
                    <span className="text-left"> 18%</span>
                  </li>
                  
                  {/* <li>
                    Post tax return
                    <a href="">why post tax?</a>
                    <span className="text-left">15.8%</span>
                  </li> */}
                </ul>
                <p className="deposit" style={{marginBottom:"12px"}}>₹ Y more than Fixed Returns</p>
                <a
                  className="btn btn-default"
                  onClick={()=>{navigate('/signup')}}
                  style={{ textAlign: "center", height: "40px" }}
                >
                  Continue
                </a>

                {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" */}

                {/* <Box sx={style} className="popup-box"> 
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33 51C33 55.7739 34.8964 60.3523 38.2721 63.7279C41.6477 67.1036 46.2261 69 51 69C55.7739 69 60.3523 67.1036 63.7279 63.7279C67.1036 60.3523 69 55.7739 69 51C69 46.2261 67.1036 41.6477 63.7279 38.2721C60.3523 34.8964 55.7739 33 51 33C46.2261 33 41.6477 34.8964 38.2721 38.2721C34.8964 41.6477 33 46.2261 33 51Z" stroke="#0D1724" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M60.08 54.3053L53.1457 43.278C52.646 42.4747 51.8338 42 50.9905 42C50.1159 42 49.335 42.4747 48.8352 43.278L41.9009 54.3053C41.3075 55.2546 41.2137 56.5326 41.6823 57.5915C42.1508 58.6504 43.0566 59.3077 44.0874 59.3077H57.9248C58.9555 59.3077 59.8614 58.6504 60.3299 57.5915C60.7984 56.5326 60.6735 55.2546 60.08 54.3053ZM59.3304 57.0073C59.0492 57.628 58.5182 58.0297 57.9248 58.0297H44.0874C43.4627 58.0297 42.9317 57.6646 42.6818 57.0073C42.4007 56.3866 42.4632 55.6563 42.8068 55.0721L49.7098 44.0448C50.0222 43.5701 50.4907 43.278 50.9905 43.278C51.4902 43.278 51.9588 43.5701 52.2711 44.0448L59.1742 55.0721C59.549 55.6563 59.6115 56.35 59.3304 57.0073Z" fill="#E6A03B" />
                        <path d="M51 52.7212C51.3125 52.7212 51.5625 52.4712 51.5625 52.1587V48.6587C51.5625 48.3462 51.3125 48.0962 51 48.0962C50.6875 48.0962 50.4375 48.3462 50.4375 48.6587V52.1899C50.4375 52.4712 50.6875 52.7212 51 52.7212Z" fill="#E6A03B" />
                        <path d="M51 53.7524C50.5 53.7524 50.0938 54.1587 50.0938 54.6587C50.0938 55.1587 50.5 55.5649 51 55.5649C51.5 55.5649 51.9063 55.1587 51.9063 54.6587C51.9063 54.1587 51.5 53.7524 51 53.7524Z" fill="#E6A03B" />
                        <path d="M2.25 51.7501C2.25228 48.4024 3.08413 45.1074 4.67117 42.1598C6.25822 39.2121 8.55098 36.7037 11.3445 34.8588C14.138 33.014 17.3451 31.8901 20.6791 31.5877C24.0132 31.2853 27.3702 31.8139 30.45 33.1261" stroke="#0D1724" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.835 8.34277C13.7516 10.33 16.0491 11.9104 18.5903 12.9898C21.1314 14.0691 23.8641 14.6252 26.625 14.6248C29.4227 14.627 32.1914 14.0573 34.761 12.9508" stroke="#0D1724" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.125 14.625C10.125 17.9071 11.4288 21.0547 13.7496 23.3754C16.0703 25.6962 19.2179 27 22.5 27C25.7821 27 28.9297 25.6962 31.2504 23.3754C33.5712 21.0547 34.875 17.9071 34.875 14.625C34.875 11.3429 33.5712 8.19532 31.2504 5.87455C28.9297 3.55379 25.7821 2.25 22.5 2.25C19.2179 2.25 16.0703 3.55379 13.7496 5.87455C11.4288 8.19532 10.125 11.3429 10.125 14.625V14.625Z" stroke="#0D1724" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          KYC Needed
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          You need to complete KYC requirements to invest
          </Typography>
          <a className="btn-default" onClick={()=>{navigate('/Kyc')}}>Continue</a>
        </Box>
      </Modal> */}

                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      <svg
                        width="72"
                        height="72"
                        viewBox="0 0 72 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M33 51C33 55.7739 34.8964 60.3523 38.2721 63.7279C41.6477 67.1036 46.2261 69 51 69C55.7739 69 60.3523 67.1036 63.7279 63.7279C67.1036 60.3523 69 55.7739 69 51C69 46.2261 67.1036 41.6477 63.7279 38.2721C60.3523 34.8964 55.7739 33 51 33C46.2261 33 41.6477 34.8964 38.2721 38.2721C34.8964 41.6477 33 46.2261 33 51Z"
                          stroke="#0D1724"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M60.08 54.3053L53.1457 43.278C52.646 42.4747 51.8338 42 50.9905 42C50.1159 42 49.335 42.4747 48.8352 43.278L41.9009 54.3053C41.3075 55.2546 41.2137 56.5326 41.6823 57.5915C42.1508 58.6504 43.0566 59.3077 44.0874 59.3077H57.9248C58.9555 59.3077 59.8614 58.6504 60.3299 57.5915C60.7984 56.5326 60.6735 55.2546 60.08 54.3053ZM59.3304 57.0073C59.0492 57.628 58.5182 58.0297 57.9248 58.0297H44.0874C43.4627 58.0297 42.9317 57.6646 42.6818 57.0073C42.4007 56.3866 42.4632 55.6563 42.8068 55.0721L49.7098 44.0448C50.0222 43.5701 50.4907 43.278 50.9905 43.278C51.4902 43.278 51.9588 43.5701 52.2711 44.0448L59.1742 55.0721C59.549 55.6563 59.6115 56.35 59.3304 57.0073Z"
                          fill="#E6A03B"
                        />
                        <path
                          d="M51 52.7212C51.3125 52.7212 51.5625 52.4712 51.5625 52.1587V48.6587C51.5625 48.3462 51.3125 48.0962 51 48.0962C50.6875 48.0962 50.4375 48.3462 50.4375 48.6587V52.1899C50.4375 52.4712 50.6875 52.7212 51 52.7212Z"
                          fill="#E6A03B"
                        />
                        <path
                          d="M51 53.7524C50.5 53.7524 50.0938 54.1587 50.0938 54.6587C50.0938 55.1587 50.5 55.5649 51 55.5649C51.5 55.5649 51.9063 55.1587 51.9063 54.6587C51.9063 54.1587 51.5 53.7524 51 53.7524Z"
                          fill="#E6A03B"
                        />
                        <path
                          d="M2.25 51.7501C2.25228 48.4024 3.08413 45.1074 4.67117 42.1598C6.25822 39.2121 8.55098 36.7037 11.3445 34.8588C14.138 33.014 17.3451 31.8901 20.6791 31.5877C24.0132 31.2853 27.3702 31.8139 30.45 33.1261"
                          stroke="#0D1724"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.835 8.34277C13.7516 10.33 16.0491 11.9104 18.5903 12.9898C21.1314 14.0691 23.8641 14.6252 26.625 14.6248C29.4227 14.627 32.1914 14.0573 34.761 12.9508"
                          stroke="#0D1724"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10.125 14.625C10.125 17.9071 11.4288 21.0547 13.7496 23.3754C16.0703 25.6962 19.2179 27 22.5 27C25.7821 27 28.9297 25.6962 31.2504 23.3754C33.5712 21.0547 34.875 17.9071 34.875 14.625C34.875 11.3429 33.5712 8.19532 31.2504 5.87455C28.9297 3.55379 25.7821 2.25 22.5 2.25C19.2179 2.25 16.0703 3.55379 13.7496 5.87455C11.4288 8.19532 10.125 11.3429 10.125 14.625V14.625Z"
                          stroke="#0D1724"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                        style={{
                          fontSize: "22px",
                          margin: "15px 0",
                          color: "#f47920",
                        }}
                      >
                        KYC Needed
                      </Typography>
                      <Typography
                        id="transition-modal-description"
                        sx={{ mt: 1 }}
                      >
                        You need to complete KYC requirements to invest
                      </Typography>
                      <a
                        className="btn-default"
                        onClick={() => {
                          navigate("/Kyc");
                        }}
                      >
                        Continue
                      </a>
                    </Box>
                  </Fade>
                </Modal>
              </div>
            </div>
          </div>
         
          <div className="mt-5">
            <h6 style={{color:"#8e5d3f" , fontSize:"17px"}}>Asset Detail </h6>
            <p className="description mt-2 mb-5">	
            This investment opportunity involves leasing out Livguard 40 AH Lithium ion battery to Mooving.
The battery is intergrated with BMS and IOT that enhanced the battery performance.
The battery will buy back at 10% resale value.
			</p>
          </div>

          <Table striped bordered hover>
      <thead>
        <tr>
         
          <th colSpan={2}  style={{backgroundColor:" #f47920" , color:"#fff" , fontFamily:"Nunito" , fontSize:"24px"}}>Comparison Of Returns</th>
          
          
        </tr>
      </thead>
      <tbody>
        <tr>
        
          <td>FD Rates</td>
          <td>6.20%</td>
         
        </tr>
        <tr>
          
          <td>Equity Mutual Funds</td>
          <td>8.65%</td>
          
        </tr>
        <tr>
          <td >Return on Property</td>
          <td>11.8%</td>
          
        </tr>
        <tr>
          
          <td >PPF</td>
          <td>7.90%</td>
          
        </tr>
        <tr>
         
          <td >RD Rates</td>
          <td>6% - 8%</td>
          
        </tr>
        
      </tbody>
      <tfoot>
        <tr style={{backgroundColor:"#ed733861"}}>
          <th>Mooving</th>
          <th>21%</th>
        </tr>
        
      </tfoot>
    </Table>
  

          <hr></hr>
          <Faq />
          
          <Documents/>
        </div>
      </section>

      <Footer />

    </div>
  );
}