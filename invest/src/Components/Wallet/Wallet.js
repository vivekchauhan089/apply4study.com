import React from 'react';
import './wallet.css';
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Wallet() {
    const navigate=useNavigate();
    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //   }, [])
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
                            <li className="breadcrumb-item"><a href="assets.php">Wallet</a></li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </section> */}
    <section className="padding_50">
        <div className="container m-4 p-3" >
            <div className="row">
                <div className="col-md-8">
                    <div className="transactions">
                        <h2>Transaction History</h2>
                        <div className="transaction-history">
                            <h4>No Data found</h4>
                            <p>You haven't made any transactions yet</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="available">
                        <h3>Available Balance</h3>
                        <p><i className="fa-solid fa-indian-rupee-sign"></i> 250</p>
                        <div className="controls">
                            <ul>
                                <li><a href="" className="btn-default">Add Money</a></li>
                                <li><a href="" className="btn-default">Withdraw</a></li>
                                <li><a href="" className="btn-default">Reinvest</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="add-money">
                        <h3><i className="fa fa-wallet"></i> Add Money</h3>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Amount"/>
                            </div>
                            <ul>
                                <li><i className="fa-solid fa-indian-rupee-sign"></i> 10,000</li>
                                <li><i className="fa-solid fa-indian-rupee-sign"></i> 20,000</li>
                                <li><i className="fa-solid fa-indian-rupee-sign"></i> 30,000</li>
                                <li><i className="fa-solid fa-indian-rupee-sign"></i> 40,000</li>
                                <li><i className="fa-solid fa-indian-rupee-sign"></i> 50,000</li>
                            </ul>
                            <a onClick={()=>{navigate('/checkout')}} className="btn btn-default">continue</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer/>
    </div>
  )
}
