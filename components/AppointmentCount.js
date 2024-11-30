import React, { useEffect, useState } from "react";

const AppointmentCount = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:3001/appointments');
        const result = await response.json();

        if (result.success) {
          setAppointments(result.data); // Set fetched appointments data
        } else {
          setError(result.message); // Handle server error message
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch appointment details.'); // Set a general error message
      } finally {
        setLoading(false); // Set loading to false after the request
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display any error messages
  }

  return (
    <div>
      <h2>Vehicle Owner Details</h2>
      <table>
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Phone Number</th>
            <th>Vehicle Number</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((item) => (
            <tr key={item._id}> {/* Use _id for MongoDB ID */}
              <td>{item.ownerName}</td> {/* Display Owner Name */}
              <td>{item.phoneNumber}</td> {/* Display Phone Number */}
              <td>{item.vehicleNumber}</td> {/* Display Vehicle Number */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentCount;
