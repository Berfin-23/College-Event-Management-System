import React, { useState } from 'react';
import AttendeeForm from './Components/AttendeeForm';
import OrganizerForm from './Components/OrganizerForm';
import AdminForm from './Components/AdminForm';
import './styles/LoginPage.css';

const LoginPage = () => {
  const [userType, setUserType] = useState('attendee'); // Default to attendee
  const [fade, setFade] = useState(false);

  const handleUserTypeChange = (type) => {
    setFade(true);
    setTimeout(() => {
      setUserType(type);
      setFade(false);
    }, 300); // Match this duration with the CSS transition duration
  };

  return (
    <div className="container">
      <h1>Login / Register</h1>
      <div className="button-group">
        <button onClick={() => handleUserTypeChange('attendee')}>Attendee</button>
        <button onClick={() => handleUserTypeChange('organizer')}>Organizer</button>
        <button onClick={() => handleUserTypeChange('admin')}>Admin</button>
      </div>
      <div className={`form-container ${fade ? 'fade-out' : 'fade-in'}`}>
        {userType === 'attendee' && <AttendeeForm />}
        {userType === 'organizer' && <OrganizerForm />}
        {userType === 'admin' && <AdminForm />}
      </div>
    </div>
  );
};

export default LoginPage;