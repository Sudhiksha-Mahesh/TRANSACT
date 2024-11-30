import React, { useState } from 'react';
import './FcComponent.css';

const FcComponent = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [rcNumber, setRcNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [fcIssuedDate, setFcIssuedDate] = useState('');
  const [fcExpiryDate, setFcExpiryDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (vehicleNumber && rcNumber && phoneNumber && emailId) {
      // Fetch FC details from the server with all inputs
      fetch(`http://localhost:3001/RTO/FCDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vehicleNumber, rcNumber, phoneNumber, emailId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Vehicle not found');
          }
          return response.json(); // Parse JSON response
        })
        .then((data) => {
          if (data.success && data.data) {
            // Set the fetched details
            setFcIssuedDate(data.data.fcIssuedDate);
            setFcExpiryDate(data.data.fcExpiryDate);
            setErrorMessage('');
          } else {
            // If vehicle not found, display an error
            setErrorMessage('No matching details found');
            setFcIssuedDate('');
            setFcExpiryDate('');
          }
        })
        .catch((error) => {
          setErrorMessage('Error fetching vehicle details. Please try again.');
          console.error('Error fetching FC details:', error);
        });
    } else {
      alert('Please fill in all the fields.');
    }
  };

  return (
    <div className="fc-container">
      <h1 className="fc-heading">Fetch FC Details</h1>
      <form className="fc-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="vehicleNumber">Vehicle Number:</label>
          <input
            type="text"
            id="vehicleNumber"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            placeholder="Enter vehicle number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rcNumber">RC Number:</label>
          <input
            type="text"
            id="rcNumber"
            value={rcNumber}
            onChange={(e) => setRcNumber(e.target.value)}
            placeholder="Enter RC number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailId">Email ID:</label>
          <input
            type="email"
            id="emailId"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Enter email ID"
            required
          />
        </div>
        <button type="submit" className="btn-fetch">Fetch Details</button>
      </form>

      {fcIssuedDate && fcExpiryDate && (
        <div className="fc-details">
          <h3>FC Details:</h3>
          <p><strong>Issued Date:</strong> {new Date(fcIssuedDate).toLocaleDateString()}</p>
          <p><strong>Expiry Date:</strong> {new Date(fcExpiryDate).toLocaleDateString()}</p>
        </div>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default FcComponent;
