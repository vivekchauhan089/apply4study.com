import React, { useState } from "react";
import "./404.css";
import { useNavigate } from "react-router-dom";
import Footer from "../assets/Footer";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../assets/Header";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "bootstrap/dist/css/bootstrap.css";
export default function Asset() {
  const navigate = useNavigate();
  const [toggleState, setToggleState] = useState(1);
   
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toggleTab = (index) => {
    //    setToggleState(index);

    setToggleState(index);
  };
  const [visible, setVisible]=useState(true);
  const style = {
    position: "absolute",
    top: "42%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    // height: 250,
    textAlign: "center",
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
   
  };
 

 
  return (
    <div>
      <Header />
       
      <section className="padding_50" style={{backgroundColor:""}}>
        <div className="container p-3 mt-5 mb-3">
          <div className="row">
        
            <h3 className="headings">
              Error! 404 Page
            </h3>

</div>
</div>
              </section>
              <Footer />
            </div>
            );
}
