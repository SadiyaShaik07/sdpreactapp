import React, { useEffect, useState } from 'react';
import './customer.css';
import { useNavigate } from 'react-router-dom';
import config from '../config'
export default function CustomerProfile() {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
    }
  }, []);

  const navigate = useNavigate();
  const redirect = () => {
  navigate("/updatecustomerprofile")
  }
  return (
    customerData ? (
      <section class="pitems">
      <div class="pcard">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsoEAMYKHiwI5JH_IlxayW3-9UurHlASFy9A&s" alt="Profile Picture"/>
        <p><strong>Full Name:</strong> {customerData.fullname}</p>
        <p><strong>Gender:</strong> {customerData.gender}</p>
        <p><strong>Date of Birth:</strong> {customerData.dateofbirth}</p>
        <p><strong>Email:</strong> {customerData.email}</p>
        <p><strong>Location:</strong> {customerData.location}</p>
        <p><strong>Contact:</strong> {customerData.contact}</p>
  <button class="update-profile-btn" onClick={redirect}>Update Profile</button>

      </div>
      </section>
    ) : (
      <p>No Customer Data Found</p>
    )
  );
}