import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for API requests
import './UserLogin.css'; // Reusing the same CSS for styling

const SignUp = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState(''); // State for name
  const [email, setEmail] = useState(''); // State for email
  const [phoneNum, setPhoneNum] = useState(''); // State for phone number
  const [password, setPassword] = useState(''); // State for password

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Send sign-up data to the backend
    axios.post('http://localhost:3001/signup', {
      name: name,
      email: email,
      phoneNum: phoneNum, // Include phone number in request
      password: password
    })
    .then(() => {
      // Navigate to the login page after successful sign-up
      navigate('/UserLogin');
    })
    .catch(err => {
      console.error('Error signing up:', err);
    });
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Sign Up</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Set the name state
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Set the email state
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNum">Phone Number:</label>
          <input
            type="text"
            id="phoneNum"
            placeholder="Enter your phone number"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)} // Set the phone number state
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Set Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Set the password state
          />
        </div>
        <button type="submit" className="btn-login">Sign Up</button>
        <p className="success-message">
          Already have an account? <Link to="/UserLogin">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
