import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Toast, ToastContainer } from 'react-bootstrap';

const Modals = ({ show, onHide, type }) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (type === 'register') {
      if (!formData.name.trim()) newErrors.name = 'Full name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (!formData.role) newErrors.role = 'Please select a role';
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must agree to terms';
    } else if (type === 'subscribe') {
      if (!formData.email) newErrors.email = 'Email or mobile number is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setValidated(false);
    } else {
      setErrors({});
      setValidated(true);
      console.log(`${type === 'register' ? 'Registered' : 'Subscribed'} with:`, formData);
      setShowToast(true);
      onHide();
      setFormData({
        name: '',
        email: '',
        password: '',
        role: '',
        termsAccepted: false,
      });
    }
  };

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
        body: JSON.stringify({ contact: email, type: 'updates' }), // field name matches backend
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
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      <Modal show={show} onHide={onHide} className={type === 'register' ? 'modal-sm registermodal' : 'modal-sm subscribemodal'}>
        <Modal.Header closeButton className='py-1'>
          <Modal.Title>{type === 'register' ? 'Register' : 'Subscribe'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={type === 'register' ? handleSubmit : handleNewsletterSubmit}>
            {type === 'register' ? (
              <>
                <Form.Group>
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Create Password *</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>I am a:</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    isInvalid={!!errors.role}
                  >
                    <option value="">-- Select --</option>
                    <option value="student">Student</option>
                    <option value="professional">Professional</option>
                    <option value="parent">Parent</option>
                    <option value="other">Other</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Check
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    label={
                      <>
                        I agree to the <a href="/terms" target="_blank" rel="noreferrer">Terms & Conditions</a>
                      </>
                    }
                    isInvalid={!!errors.termsAccepted}
                    feedback={errors.termsAccepted}
                    feedbackType="invalid"
                  />
                </Form.Group>

                <Button type="submit" className="mt-3 w-100" variant="primary">Register</Button>
              </>
            ) : (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Email or Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="subscribe_email"
                    placeholder="Enter your email or mobile number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="w-100" variant="primary" disabled={loading}>{loading ? "Subscribing..." : "Subscribe"}</Button>
              </>
            )}
          </Form>
          {message && (
            <p style={{ marginTop: "8px", color: "#FD7311", fontSize: "0.8rem" }}>
              {message}{" "}
            </p>
          )}
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="success">
          <Toast.Header>
            <strong className="me-auto">{type === 'register' ? 'Registration' : 'Subscription'}</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {type === 'register'
              ? 'You have successfully registered!'
              : 'You have successfully subscribed!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default Modals;
