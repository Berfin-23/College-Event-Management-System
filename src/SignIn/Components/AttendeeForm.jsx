import React, { useState } from 'react';
import OtpVerification from './OtpVerification';
import emailjs from 'emailjs-com';
import { CSSTransition } from 'react-transition-group'; // Import CSSTransition

const AttendeeForm = () => {
  const [formType, setFormType] = useState('register');
  const [name, setName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const generatedOtp = generateOtp();
    setOtp(generatedOtp);
    
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { otp: generatedOtp, to_email: email }, 'YOUR_USER_ID')
      .then(() => {
        alert(`OTP sent to ${email}`);
        setOtpSent(true);
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        alert('Failed to send OTP. Please try again.');
      });
  };

  const handleVerifyOtp = () => {
    alert('Registration successful!');
  };

  const handleResendOtp = () => {
    const generatedOtp = generateOtp();
    setOtp(generatedOtp);
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', { otp: generatedOtp, to_email: email }, 'YOUR_USER_ID')
      .then(() => {
        alert(`OTP resent to ${email}`);
      })
      .catch((error) => {
        console.error('Error resending OTP:', error);
        alert('Failed to resend OTP. Please try again.');
      });
  };

  return (
    <>
    <div className='page'>
    <div className="container">
      <div className="form-container">
        <CSSTransition in={otpSent} timeout={500} classNames="fade" unmountOnExit>
          <OtpVerification onVerify={handleVerifyOtp} resendOtp={handleResendOtp} />
        </CSSTransition>
        <CSSTransition in={!otpSent} timeout={500} classNames="fade" unmountOnExit>
          <form onSubmit={formType === 'register' ? handleRegisterSubmit : null}>
            {formType === 'register' ? (
              <>
                <h2>Register as Attendee</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Register Number"
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
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
                <button type="submit" className="submit-button">Register</button>
              </>
            ) : (
              <>
                <h2>Login as Attendee</h2>
                <input
                  type="text"
                  placeholder="Register Number or Email"
                  value={registerNumber || email}
                  onChange={(e) => (e.target.value.includes('@') ? setEmail(e.target.value) : setRegisterNumber(e.target.value))}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="submit-button">Login</button>
              </>
            )}
            <p className="register-link" onClick={() => setFormType(formType === 'register' ? 'login' : 'register')}>
              Switch to {formType === 'register' ? 'Login' : 'Register'}
            </p>
          </form>
        </CSSTransition>
      </div>
    </div>
    </div>
    </>
  );
};

export default AttendeeForm;
