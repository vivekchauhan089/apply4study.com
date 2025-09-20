import React from 'react'
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { useNavigate } from 'react-router-dom';
import "./asset.css";
import { useState } from 'react';
export default function Popup() {

    const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
         
         <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  // BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                     
                       <div className="login-form">
                        <h1>Let's get you started</h1>
                        <div className="enter-mobile">
                            <form>
                                
                            {visible&&    <div className="enter-mobile">
                                    <div className="form-group row">
                                       <div className="col-sm-12">
                                            <input type="text" className="form-control-plaintext" id="staticEmail" placeholder="Enter Full Name"/>
                                          

                                        </div>

                                        <div className="col-sm-12 mt-3 mb-3">
                                            <input type="text" className="form-control-plaintext" id="staticEmail" placeholder="Enter Mobile Number"/>
                                          

                                        </div>
                                        <button onClick={()=>{setVisible(false)}} className="btn btn-default mb-2">Send OTP</button>
                                    </div>
                                </div>}

                                {!visible &&
                                <div className="enter-otp">
                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control-plaintext" id="staticEmail" placeholder="Enter OTP"/>
                                        </div>
                                    </div>
                                    <a type="" className="btn btn-default mb-2" onClick={()=>{navigate('/assetdetail')}}>Continue</a>
                                </div>
}
                                
                            </form>
                        </div>
                      
                    </div>
                    
                    </Box>
                  </Fade>
                </Modal>
    </div>
  )
}
