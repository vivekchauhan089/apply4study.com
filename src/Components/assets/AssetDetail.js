import React from "react";
import { useState, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/AssetDetail.css";
import { Slider } from "@mui/material";
import styled from "styled-components";
import Table from 'react-bootstrap/Table'
import RangeSlider from 'react-bootstrap-range-slider';
import Footer from "./Footer";
import Highcharts, { relativeLength } from 'highcharts';
import HighchartsReact from "highcharts-react-official";

import Header from "./Header";
import { useEffect, useId } from "react";
import Accordion from "react-bootstrap/Accordion";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Faq from "./Faq";
import Documents from "./Documents";
import { Navigate, useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake'



const auth = localStorage.getItem("token");

const chartdata = [];
const chartname = [];
export default function AssetDetails({ title }) {
  const [plan, setPlan] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const unique_id = uuid();

  useEffect(() => {

    var raw = { "token": "msl2n2bthl", "jobType": "plan_list", "product_type": title }

    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(raw),

    };

    fetch("http://localhost/investor_api/index.php/InvestorApis", requestOptions)
      .then(response => response.text())
      .then((result) => {
        //console.log(result);
        const res = JSON.parse(result);
        setPlan(res.plan_details);
        //console.log(res.plan_details?.[0].compare);
        var i = 0;
        for (const [key, value] of Object.entries(res.plan_details?.[0].compare)) {
          chartname[i] = key;
          chartdata[i] = parseFloat(value);
          i++;
        }
        //console.log(chartname);
        //console.log(chartdata);

        // Object.keys(plan?.compare.forEach(function(key) {
        //   console.log(plan?.compare[key].image);
        //    console.log(plan?.[0]);


      })
      .catch(error => console.log('error', error));

  }, [])


  const option = {

    colors: [
      '#f4792033', '#f4792055', '#f4792077', '#f4792099', '#f47920BB', '#f47920FF'
    ],
    title: {
      text: 'Comparison of Returns',
      align: 'left',
      style: {
        fontSize: '22px',
        fontWeight: '600',
        fontFamily: "Nunito",
        color: "#1010101",
        marginBottom: '10px'

      }
    },
  
    xAxis: {
      categories: chartname
    },
    series: [{
      events: {
        legendItemClick: function (e) {
            e.preventDefault();
        }
    },
      data: chartdata,
      name: 'Internal rate of return',
      type: 'column'
    }],
    yAxis: {

      title: {
        text: 'Percentage'
      }
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        return '<table class="table table-bordered" ><tr><th>' + this.x + '</th><th>Mooving</th></tr><tr><td>' + this.y + '%</td><td>16%</td></tr></table>';

      }
    },
    plotOptions: {
      series: { colorByPoint: true },

    }
  }

  const [value, setValue] = React.useState(10);

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };

  var amount = parseFloat(plan?.[0].amount) || "0";
  var irr = parseFloat(plan?.[0].return_rate)  || "0";
  var gst = parseFloat(plan?.[0].gst) || "0";
  var tenure = parseFloat(plan?.[0].tenure)|| "0";
  var rate = parseFloat(plan?.[0].rate)|| "0";
  var resale = parseFloat(plan?.[0].resale_rate)|| "0";
  var ret = parseFloat(plan?.[0].rate);
  var r = parseFloat(plan?.[0].resale_rate)|| "0";
  var p_percent = (parseFloat(plan?.[0].last_emi_add_percentage) / 100)|| "0";
  const price = value * amount || "0";
  const t = tenure;
  const basicAmount = Math.round((price / (1 + gst / 100))).toFixed(0) || "0";
  const totalGstAmount = price * (gst / 100)|| "0";
  const payout = Math.round((rate / 100) * basicAmount) || "0";
  const gstAmount = Math.round(payout * (gst / 100)).toFixed(0)|| "0";
  const emi = (parseFloat(payout) + parseFloat(gstAmount));
  const total = Math.round((emi * t) + (price * (r / 100)))||"0";
  
  const earn = Math.round(total - price)||"0";
  const navigate = useNavigate();
  const tableArray = [];
  var i = 0;
  var singlePayout = (rate / 100) * ((amount / (1 + gst / 100)));
  //var firstEmi=singlePayout+ singlePayout*(gst/100);
  var firstEmi = Math.round(singlePayout).toFixed(1);

  let newDate = new Date();
  for (i = 0; i < t; i++) {
    let month = newDate.setMonth(newDate.getMonth() + 1);
    let monthString = newDate.toLocaleString('default', { month: 'long' });
    let year = newDate.getFullYear();
    if (i == (t - 1)) {
      tableArray[i] = {
        "no": (i + 1),
        "date": monthString + '-' + year,
        "payout": Math.round(payout + (price * p_percent)).toFixed(0),
        "gst": Math.round((payout + (price * p_percent)) * (gst / 100)).toFixed(1),
        "payment": Math.round(emi + (price * p_percent)).toFixed(0)
      };
    } else {
      tableArray[i] = {
        "no": (i + 1),
        "date": monthString + '-' + year,
        "payout": Math.round(payout).toFixed(0),
        "gst": Math.round(gstAmount).toFixed(1),
        "payment": Math.round(emi).toFixed(0)
      };
    }
  }



  const options1 = {
    colors: [
      'rgb(142, 93, 63)', '#eee', '#f47920FF'
    ],
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },

    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    title: {
      text: 'Total Investment + Return'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Amount',
      colorByPoint: true,
      data: [{
        name: 'Actual Investment',
        y: parseInt(Math.round(basicAmount).toFixed(0))
      }, {
        name: 'GST',
        y: parseInt(Math.round(price - basicAmount).toFixed(0))
      }, {
        name: 'Return Amount',
        y: parseInt(Math.round(earn).toFixed(0)),
        sliced: true,
        selected: true

      }]
    }]

  }

  function printDocument() {
    //const input = document.getElementById('divToPrint');
    //if (localStorage.getItem("token")) {   
    const doc = new jsPDF();

    //get table html
    const pdfTable = document.getElementById('divToPrint');
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();
	//} else { navigate("/login") }

  }

  const style = {
    position: "absolute",
    top: "42%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 350,
    textAlign: "center",
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 0,
  };

  useEffect(() => {
    window.scrollTo(0, 0)

  }, [])

  function saveData() {

    if (localStorage.getItem("token")) { navigate("/payment_detail"); } else { navigate("/login") }


    const cartArray = {
      "order_id": unique_id,
      "price": price,
      "earn": earn,
      "gst": gst,
      "number": value,
      "title": title,
      "basicAmount": basicAmount,
      "gstamount": gstAmount,
      "value": value,
      "irr": irr
    }
    window.localStorage.setItem("cartArray", JSON.stringify(cartArray));

  }





  return (
    <div>
      <Header />


      <section className="padding_50" style={{ backgroundColor: "" }}>
        <div className="container pt-3 mt-3 pb-3 mb-3">
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <div className="asset-detail">


                <div className="asset-image">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={option}
                  />
                </div>
                <div className="row " style={{ paddingLeft: "50px" }}>
                  <div className="col-md-2 col-sm-6">
                    <div className="asset-info">
                      <h3>{irr}%</h3>
                      <span>Return(IRR)</span><br />
                      {/* <a style={{ color: "#f47920" }}>
                        What is IRR?
                      </a> */}
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-6">
                    <div className="asset-info">
                      <h3>{tenure}</h3>
                      <span>Months Tenure</span>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-6">
                    <div className="asset-info">

                      <h3>₹{parseInt(firstEmi).toLocaleString()}</h3>

                      <span>Monthly Payout</span>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-6">
                    <div className="asset-info">
                      <h3>₹{amount.toLocaleString()}</h3>
                      <span>Min Investment</span>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="asset-info">
                      <h3> {resale}%</h3>
                      <span>Resale Value </span>
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
                <p >Select the number of {title} </p>
                <div style={{ display: "flex", justifyContent: "space-between" }} className="mt-4">
                  <p class="min" >Min</p>

                  <span id="non-linear-slider" className="range-value" gutterBottom >
                    {value} </span>
                  <p class="max" >Max</p>

                </div>


                <Slider
                  value={value}
                  min={1}
                  style={{ color: "#273c75" }}
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
                {/* <div className="range-slider">
                            <input type="range" value="30" min="0" max="100" range="true"/>
                            <span className="range-value">30</span>
                            <p className="min">Min</p>
                            <p className="max">Max</p>


                <PrettoSlider
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  defaultValue={20}
                
                />

                <div className="add-asset">
                  <ul>
                    <li>
                      <i className="fa fa-plus"></i>
                    </li>
                    <li>
                      <i className="fa fa-minus"></i>
                    </li>
                  </ul>
                </div>
                <div className="tags">
                  <ul>
                    <li>+ 10</li>
                    <li>+ 20</li>
                    <li>+ 30</li>
                    <li>+ 40</li>
                  </ul>
                </div>
                {/* <p>
                  Don't worry about losing interest till the deal is fully
                  complete! <a href="">How?</a>
                </p> */}
                <ul className="deposit-summary">
                  <li>
                    Total Investments
                    <span className="text-left" >₹ {price.toLocaleString()}</span>
                  </li>

                  <li>
                    Pre Tax Returns
                    <span className="text-left">₹ {total.toLocaleString()}</span>
                  </li>
                  <li>
                    Earn
                    <span className="text-left">₹ {earn.toLocaleString()}</span>
                  </li>
                  <li>
                    Tax Applicable
                    <span className="text-left"> {gst}%</span>
                  </li>

                  {/* <li>
                    Post tax return
                    <a href="">why post tax?</a>
                    <span className="text-left">15.8%</span>
                  </li> */}
                </ul>
                {/* <p className="deposit" style={{marginBottom:"12px"}}>₹  {earn} more than Fixed Returns</p> */}
                <div style={{marginBottom:"18px"}}><a className="deposit" onClick={printDocument} style={{ cursor: "pointer" }} > Download Payment schedule</a></div>


                <a
                  className="btn btn-default"
                  onClick={() => { saveData() }}
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
                      {/*                      
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
                      </Typography> */}

                      <div style={{ overflowY: "scroll", maxHeight: "220px" }} >

                        <Table striped bordered hover style={{ lineHeight: "1em" }}>


                          <thead 
                          >

                            <tr><th title="Field #1" >Pmt No.</th>

                              <th title="Field #2">Payment Date</th>
                              <th title="Field #7">Total payout by Mooving</th>

                            </tr></thead>

                          <tbody>
                            {tableArray.map((val, index) => (
                            //  {val.payment = ''}
                              <tr>
                                <td>{val.no}</td>
                                <td>{val.date}</td>
                                {/*<td align="right">{val.payout}</td>
<td align="right">{val.gst}</td>
<td>{val.payment}</td>
<td>{val.payout}</td>
*/}   
                                <td>{parseInt(val.payment)}</td>
                              </tr>

                            ))}


                            <tr style={{ backgroundColor: "#ed733861" }}>

                              <td>Total</td>

                              <td> </td>

                              {/*<td align="right">103619</td>

<td align="right">5181</td>

<td>107626</td>

<td>103619</td>
*/}
                              <td>{total.toLocaleString()}</td>

                            </tr>

                            <tr >

                              <td>IRR</td>


                              <td>{irr}%</td>

                            </tr>

                          </tbody>
                        </Table>
                      </div><button className="btn btn-default">Download PDF</button>
                      {/* 
                      <a
                        className="btn-default"
                        onClick={() => {
                          navigate("/Kycnew");
                        }}
                      >
                        Continue
                      </a> */}
                    </Box>
                  </Fade>
                </Modal>
              </div>
            </div>
          </div>




          <div className="mt-5">
            <h6 style={{ color: "#000", fontSize: "22px", marginBottom: "18px", position: "relative", marginLeft: "20px" }}><span className="orange-circle section"></span>Asset Detail </h6>
            <p className="description mt-2 mb-5">This investment opportunity involves leasing out Lectrix ecity Zip vehicles to Mooving.

              The ebike will buy back at {resale}% resale value.

            </p>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6" id="divToPrint" >
              <h6 style={{color:"#000" , fontSize:"22px" , marginBottom:"16px",position:"relative", marginLeft:"20px" }}><span className="orange-circle section"></span>Payment schedule</h6>
              <div style={{overflowY:"scroll" , maxHeight:"300px"}} >
              <table className="table table-bordered" width="100%" >
                <thead className="table_head"  >
                  <tr >
                    <th  >Pmt No.</th>
                    <th >Payment Date</th>
                    <th >Total payout by Mooving </th>
                  </tr>
                </thead>
                <tbody>
                  {tableArray.map((val, index) => (
                    <tr>
                      <td>{val.no}</td>
                      <td>{val.date}</td>
                      <td>₹{parseInt(val.payment).toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr >
                    <td>Total</td>
                    <td> </td>
                    <td>{total.toLocaleString()}</td>
                  </tr>
                  <tr >
                    <td>IRR</td>
                    <td> </td>
                    <td>{irr}%</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          <div className="col-md-6 col-sm-6">

            <HighchartsReact
              highcharts={Highcharts}
              options={options1}
            />
          </div>


        </div>


        <hr></hr>
        <Faq />

        <Documents />
    </div>
      </section >

    <Footer />

    </div >
  );
}