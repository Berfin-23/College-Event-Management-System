import React, { useState } from 'react';
import OtpVerification from './OtpVerification'; // Assuming you have an OTP verification component
import emailjs from 'emailjs-com'; // For sending emails
import { CSSTransition } from 'react-transition-group'; // For transitions

const OrganizerForm = () => {
  const [formType, setFormType] = useState('register'); // toggle between 'register' and 'login'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const generatedOtp = generateOtp();
    setOtp(generatedOtp);
    
    // Sending OTP to the HOD's email
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { otp: generatedOtp, to_email: 'hod@example.com' }, 'YOUR_USER_ID')
      .then(() => {
        alert(`OTP sent to HOD's email`);
        setOtpSent(true);
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        alert('Failed to send OTP. Please try again.');
      });
  };

  const handleVerifyOtp = () => {
    alert('Registration successful!');
    // Handle any post-registration logic here
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    alert('Login successful!');
  };

  const handleResendOtp = () => {
    const generatedOtp = generateOtp();
    setOtp(generatedOtp);
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { otp: generatedOtp, to_email: 'hod@example.com' }, 'YOUR_USER_ID')
      .then(() => {
        alert(`OTP resent to HOD's email`);
      })
      .catch((error) => {
        console.error('Error resending OTP:', error);
        alert('Failed to resend OTP. Please try again.');
      });
  };

  return (
    <div className="container">
      <div className="form-container">
        <CSSTransition in={otpSent} timeout={500} classNames="fade" unmountOnExit>
          <OtpVerification onVerify={handleVerifyOtp} resendOtp={handleResendOtp} />
        </CSSTransition>
        <CSSTransition in={!otpSent} timeout={500} classNames="fade" unmountOnExit>
          <form onSubmit={formType === 'register' ? handleRegisterSubmit : handleLoginSubmit}>
            {formType === 'register' ? (
              <>
                <h2>Register as Organizer</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Register</button>
              </>
            ) : (
              <>
                <h2>Login as Organizer</h2>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
              </>
            )}
            <p className="register-link" onClick={() => setFormType(formType === 'register' ? 'login' : 'register')}>
              Switch to {formType === 'register' ? 'Login' : 'Register'}
            </p>
          </form>
        </CSSTransition>
      </div>
    </div>
  );
};

export default OrganizerForm;
