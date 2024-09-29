import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Header from "./assets/Header";
import Footer from "./assets/Footer";
import { useEffect } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [type, setType] = useState(" ");
  let name;
  const handle = (e) => {
    setType(e.target.value);
    name = e.target.value;
    localStorage.setItem("type", name);
    //  console.log(name);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
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

      <section className="main" style={{ backgroundColor: "#000" }}>
        <div className="container ">
          <div className="row">
            <div className="col-md-12 mt-5 mb-5">
              <div
                className="login-form"
                style={{ width: "600px", height: "auto" }}
              >
                <h1 style={{ marginBottom: "10px" }}><span class="orange-circle" style={{ top: "14px", left: "37%"}}></span> Sign Up</h1>
                <span style={{ textAlign: "center" }}>
                  Already registered? &nbsp;
                  <a
                    href=""
                    onClick={() => {
                      navigate("/login");
                    }}
                    style={{ display: "inline",color:"#f47920"}}
                  >
                    Login
                  </a>
                </span>
                <div className="enter-mobile">
                  <form>
                    <div className="enter-mobile">
                      <div className="form-group row">
                        <div className="col-sm-6">
                          <label className="naam" style={{ float: "left" }}>
                            Full Name
                          </label>
                          <input type="text" className="form-control-plaintext mb-3" id="staticEmail" placeholder=" jane doe"
                          />
                        </div>
                        <div className="col-sm-6">
                          <label className="naam" style={{ float: "left" }}>
                            Mobile Number
                          </label>
                          <input type="text" className="form-control-plaintext mb-3" id="staticEmail" placeholder="1234567890"/>
                        </div>
                      </div>
                    </div>
                    <div className="enter-mail">
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <label className="naam" style={{ float: "left" }}>
                            Email
                          </label>
                          <input
                            type="text"
                            className="form-control-plaintext mb-3"
                            id="staticEmail"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>

                    <div class="enter-type">
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <label
                            className="naam"
                            for="inputState"
                            style={{ float: "left" }}
                          >
                            Type of Investor
                          </label>
                          <select
                            id="inputState"
                            class="form-control"
                            style={{ backgroundColor: "#eee" }}
                            value={type.value}
                            onChange={(e) => {
                              handle(e);
                            }}
                          >
                            <option>Select</option>
                            <option>Company</option>
                            <option>Individual</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="mt-4 ">
                  <button
                    className="btn btn-default"
                    style={{ width: "100%" }}
                    onClick={() => {
                      navigate("/Kycnew");
                    }}
                  >
                    Sign Up
                  </button>
                </div>
                <p style={{ textAlign: "center" }}>
                  By signing up, you agree to the <b>Terms & conditions</b> and{" "}
                  <b>Privacy Policy</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
