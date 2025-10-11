import React, { useState, useEffect } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
        },
        body: JSON.stringify({ contact: email, type: 'newsletter' }), // field name matches backend
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        setMessage(data.message || "You are already subscribed.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🕒 Auto-clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="section light-background">
      <div className="container">
        <div className="row gy-4 align-items-center">
          <div className="col-lg-6 col-md-6 col-12" data-aos="slide-up" data-aos-delay="100">
            <div className="container section-title pb-0" data-aos="fade-up">
              <h5>Subscribe to Our Newsletter</h5>
              <p>Get the latest updates, learning tips, and offers delivered straight to your inbox.</p>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-12" data-aos="slide-down" data-aos-delay="200">
              <div className="newsletter-form">
                <form className="newsletter-form justify-content-start" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="text"
                    placeholder="Enter your email or mobile number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button type="submit" disabled={loading}>
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
              </div>
              {message && (
                <p style={{ color: "#FD7311", margin: "0 120px", fontSize: "0.9rem" }}>
                  {message}{" "}
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
