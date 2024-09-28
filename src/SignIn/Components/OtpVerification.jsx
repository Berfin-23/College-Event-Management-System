import React, { useState } from 'react';

const OtpVerification = ({ onVerify, resendOtp }) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === 'YOUR_GENERATED_OTP') { // Replace with logic to compare with the sent OTP
      onVerify(); // Call the onVerify function passed as a prop
    } else {
      alert('Invalid OTP! Please try again.');
    }
  };

  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
      <p className="register-link" onClick={resendOtp}>
        Resend OTP
      </p>
    </div>
  );
};

export default OtpVerification;
