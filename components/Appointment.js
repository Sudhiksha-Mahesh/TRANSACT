import React, { useState } from 'react';
import './Appointment.css';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    phoneNumber: '',
    vehicleNumber: '',
    vehicleModel: '',
    overallCondition: '',
    enginePerformance: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    fetch('http://localhost:3001/appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), // Send form data to backend
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Appointment scheduled successfully!');
          setFormData({
            ownerName: '',
            phoneNumber: '',
            vehicleNumber: '',
            vehicleModel: '',
            overallCondition: '',
            enginePerformance: '',
          }); // Clear form on success
        } else {
          alert('Error scheduling appointment. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error submitting form.');
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  return (
    <div>
      <h1>Schedule an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Owner Name:</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vehicle Number:</label>
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vehicle Model:</label>
          <input
            type="text"
            name="vehicleModel"
            value={formData.vehicleModel}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Overall Condition:</label>
          <input
            type="text"
            name="overallCondition"
            value={formData.overallCondition}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Engine Performance:</label>
          <input
            type="text"
            name="enginePerformance"
            value={formData.enginePerformance}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Scheduling...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
