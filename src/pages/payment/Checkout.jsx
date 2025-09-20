import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function Checkout() {
  const { id } = useParams();

  useEffect(() => {
    // Call Razorpay or Stripe here for payment flow
    console.log('Initiating payment for course:', id);
  }, [id]);

  return (
    <div className="checkout">
      <h2>Checkout for Course ID: {id}</h2>
      <p>Implement your Razorpay or Stripe payment integration here.</p>
    </div>
  );
}