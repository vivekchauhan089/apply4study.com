import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import paypalLogo from "../../assets/img/payments/paypal.png";
import stripeLogo from "../../assets/img/payments/stripe.png";

const PaymentModal = ({ show, onHide, plan }) => {
  const [selectedGateway, setSelectedGateway] = useState(null);

  const APP_URL = process.env.REACT_APP_URL;

  const paymentMethods = [
    { id: "razorpay", name: "Razorpay", logo: "./razorpay.svg" },
    { id: "paytm", name: "Paytm", logo: "./paytm.svg" },
    { id: "paypal", name: "PayPal", logo: paypalLogo },
    { id: "stripe", name: "Stripe", logo: stripeLogo },
  ];

  const handleProceed = async () => {
    if (!selectedGateway) return alert("Please select a payment method.");
    
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/payment/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              plan_id: plan.id,
              plan_name: plan.name,
              amount: plan.price,
              gateway: selectedGateway,
              user_id: localStorage.getItem("user_id") || "68ee304335de1390e819b82e",
            }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Payment initiation failed");

        // Gateway Handling
        if (selectedGateway === "razorpay") {
            const options = {
              key: data.key,
              amount: data.amount,
              currency: data.currency,
              name: "Apply4Study",
              description: plan.name,
              order_id: data.order_id,
              handler: async (paymentResponse) => {
                await fetch(`${process.env.REACT_APP_API_URL}/payment/verify`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    gateway: selectedGateway,
                    plan_id: plan.id,
                    user_id: localStorage.getItem("user_id") || "68ee304335de1390e819b82e",
                    ...paymentResponse,
                  }),
                });
                alert("✅ Payment successful!");
              },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } else if (selectedGateway === "paytm") {
            window.location.href = data.redirect_url;
        } else if (selectedGateway === "paypal") {
            window.open(data.redirect_url, "_blank");
        }

    } catch (err) {
        console.error(err);
        alert("❌ Payment failed. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className="payment-modal">
      <Modal.Header closeButton>
        <Modal.Title>Choose Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-wrap grid grid-cols-2 gap-4">
          {paymentMethods.map((m) => (
            <div
              key={m.id}
              className={`payment-option ${selectedGateway === m.id ? "active" : ""}`}
              onClick={() => setSelectedGateway(m.id)}
              style={{
                cursor: "pointer",
                border: selectedGateway === m.id ? "2px solid #007bff" : "1px solid #ccc",
                borderRadius: "12px",
                padding: "15px",
                width: "130px",
                textAlign: "center",
                transition: "0.3s",
              }}
            >
              <img src={m.logo} alt={m.name} style={{height: `${m.id == 'razorpay' || m.id == 'paytm' ? '20' : '40'}px`}} />
              <p className="mt-2 mb-0" style={{ fontSize: "0.9rem" }}>{m.name}</p>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleProceed}>Proceed to Pay</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
