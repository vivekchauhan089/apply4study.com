import React, { useState } from 'react';

const PricePlan = () => {
    const [activeTab, setActiveTab] = useState('student');

    return (
        <section className="pricing section light-background">
            <div className="container">
                <div className="section-title" data-aos="fade-up">
                    <h5>Choose Your Plan</h5>
                    <p>We offer a variety of plans to suit your learning needs. Explore our options and find the perfect fit for you.</p>
                    <p>Explore our platform with a <strong>7-day free trial</strong> — no credit card required!</p>
                </div>

                {/* Tab Buttons */}
                <div className="text-center mb-5 tabs">
                    <button
                        className={`btn theme-btn mx-2 ${activeTab === 'student' ? 'active' : ''}`}
                        onClick={() => setActiveTab('student')}
                    >
                        For Students
                    </button>
                    <button
                        className={`btn theme-btn mx-2 ${activeTab === 'teacher' ? 'active' : ''}`}
                        onClick={() => setActiveTab('teacher')}
                    >
                        For Teachers
                    </button>
                </div>

                <div className="row mt-3">

                    {activeTab === 'student' && (
                        <>
                            <div className="col-lg-4">
                                <div className="pricing-item">
                                    <h3>🆓 Free Plan</h3>
                                    <h4><sup>₹</sup>19<span>/month</span></h4>
                                    <h4><span className="na">Perfect for exploring</span></h4>
                                    <p className="text-description">Get started with essential learning tools at no cost.</p>
                                    <ul>
                                        <li><i className="bi bi-check2-all"></i> Access to selected free courses</li>
                                        <li><i className="bi bi-check2-all"></i> Join live webinars & demo classes</li>
                                        <li><i className="bi bi-check2-all"></i> Personalized learner dashboard</li>
                                        <li><i className="bi bi-check2-all"></i> Progress tracking tools</li>
                                        <li className="na"><i className="bi bi-check2"></i> <span>No certificates or full course access</span></li>
                                    </ul>
                                    <a href="#" className="buy-btn">Buy Now</a>
                                </div>
                            </div>

                            <div className="col-lg-4 featured">
                                <div className="pricing-item">
                                    <h3>💼 Starter Plan</h3>
                                    <h4><sup>₹</sup>499<span>/month</span></h4>
                                    <h4 className="mb-0"><span>Ideal for beginners & students</span></h4>
                                    <h6 className="mb-0">Build strong foundations with structured learning.</h6>
                                    <ul>
                                        <li><i className="bi bi-check2-all"></i> Full access to academic & skill courses</li>
                                        <li><i className="bi bi-check2-all"></i> Interactive video lessons & notes</li>
                                        <li><i className="bi bi-check2-all"></i> Live class access (limited sessions)</li>
                                        <li><i className="bi bi-check2-all"></i> Basic quizzes & assignments</li>
                                        <li><i className="bi bi-check2-all"></i> Monthly progress report</li>
                                        <li><i className="bi bi-check2-all"></i> Certificate of completion</li>
                                    </ul>
                                    <a href="#" className="buy-btn">Buy Now</a>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="pricing-item">
                                    <h3>🚀 Pro Plan</h3>
                                    <h4><sup>₹</sup>999<span>/month</span></h4>
                                    <h4><span>Best for serious learners</span></h4>
                                    <p>Everything you need to master your goals and grow.</p>
                                    <ul>
                                        <li><i className="bi bi-check2-all"></i> Unlimited course access</li>
                                        <li><i className="bi bi-check2-all"></i> All live classes & Q&A sessions</li>
                                        <li><i className="bi bi-check2-all"></i> Downloadable content</li>
                                        <li><i className="bi bi-check2-all"></i> Premium quizzes & mock tests</li>
                                        <li><i className="bi bi-check2-all"></i> 1-on-1 mentorship (2 sessions/month)</li>
                                        <li><i className="bi bi-check2-all"></i> Advanced certification</li>
                                        <li><i className="bi bi-check2-all"></i> Performance dashboard</li>
                                    </ul>
                                    <a href="#" className="buy-btn">Buy Now</a>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'teacher' && (
                        <>
                            <div className="col-lg-4">
                                <div className="pricing-item">
                                    <h3>🧑‍🏫 Basic Educator</h3>
                                    <h4><sup>₹</sup>299<span>/month</span></h4>
                                    <ul>
                                        <li><i className="bi bi-check2-all"></i> Create and publish up to 5 courses</li>
                                        <li><i className="bi bi-check2-all"></i> Access to educator dashboard</li>
                                        <li><i className="bi bi-check2-all"></i> View learner analytics</li>
                                        <li><i className="bi bi-check2-all"></i> Email support</li>
                                    </ul>
                                     <a href="#" className="buy-btn">Buy Now</a>
                                </div>
                            </div>
                            <div className="col-lg-4 featured">
                                <div className="pricing-item">
                                    <h3>💼 Starter Plan</h3>
                                    <h4><sup>₹</sup>499<span>/month</span></h4>
                                    <h4 className="mb-0"><span>Ideal for beginners & students</span></h4>
                                    <h6 className="mb-0">Build strong foundations with structured learning.</h6>
                                    <ul>
                                        <li><i className="bi bi-check2-all"></i> Full access to academic & skill courses</li>
                                        <li><i className="bi bi-check2-all"></i> Interactive video lessons & notes</li>
                                        <li><i className="bi bi-check2-all"></i> Live class access (limited sessions)</li>
                                        <li><i className="bi bi-check2-all"></i> Basic quizzes & assignments</li>
                                        <li><i className="bi bi-check2-all"></i> Monthly progress report</li>
                                        <li><i className="bi bi-check2-all"></i> Certificate of completion</li>
                                    </ul>
                                    <a href="#" className="buy-btn">Buy Now</a>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="pricing-item">
                                    <h3>🌟 Pro Educator</h3>
                                    <h4><sup>₹</sup>799<span>/month</span></h4>
                                    <ul>
                                        <li><i className="bi bi-check2-all"></i> Unlimited course publishing</li>
                                        <li><i className="bi bi-check2-all"></i> Access to live session tools</li>
                                        <li><i className="bi bi-check2-all"></i> Priority support</li>
                                        <li><i className="bi bi-check2-all"></i> Detailed engagement analytics</li>
                                        <li><i className="bi bi-check2-all"></i> Monetize your content</li>
                                    </ul>
                                    <a href="#" className="buy-btn">Buy Now</a>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PricePlan;
