import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './customer.css';
import config from '../config'
export default function UpdateCustomerProfile() {
  const [customerData, setCustomerData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    location: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialCustomerData, setInitialCustomerData] = useState({});

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
      setInitialCustomerData(parsedCustomerData); // Store initial job seeker data
    }
  }, []);

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const updatedData = {};
      for (const key in customerData) {
        if (customerData[key] !== initialCustomerData[key] && initialCustomerData[key] !== '') {
          updatedData[key] = customerData[key]; 
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        // There are changes
        updatedData.email = customerData.email;
        const response = await axios.put(`${config.url}/updatecustomerprofile`, updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`${config.url}/customerprofile/${customerData.email}`, updatedData)
        localStorage.setItem("customer",JSON.stringify(res.data)) // to update in local storage
      } else {
        // No changes
        setMessage("No Changes in Customer Profile");
        setError("");
      }
    } 
    catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };
  
  
  return (
    <div>
        
      <h3 align="center"><u>Update Profile</u></h3>
      {message ? <h4 align="center">{message}</h4> : <h4 align="center" color='red'>{error}</h4>}

      <div class="formcontainer">
    <form onSubmit={handleSubmit}>
        <div class="form-row">
            <div class="input-data">
                <label for="">Full Name</label>
                <div class="underline"></div>
                <input type="text" id="fullname" value={customerData.fullname} onChange={handleChange} required />
            </div>
            <div class="select-wrapper">
  <label for="gender">Gender</label>
                <div class="underline"></div>
  <div class="custom-dropdown">
    <select id="gender" value={customerData.gender} onChange={handleChange} required>
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="others">Others</option>
    </select>
  </div>
</div>
            <div class="input-data">
                <label for="">Date of Birth</label>
                <div class="underline"></div>
                <input type="date" id="dateofbirth" value={customerData.dateofbirth} onChange={handleChange} required />
            </div>
            <div class="input-data">
                <label for="">Email</label>
                <div class="underline"></div>
                <input type="email" id="email" value={customerData.email} onChange={handleChange} required />
            </div>
            <div className="input-data">
  <label htmlFor="password">Password</label>
  <div className="underline"></div>
  <input 
    type="password" 
    id="password" 
    value={customerData.password} 
    onChange={handleChange} 
    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
    title="Password must contain at least one number, one uppercase and one lowercase letter, and at least 8 or more characters" 
    required 
  />
</div>

            <div class="input-data">
                <label for="">Location</label>
                <div class="underline"></div>
                <input type="text" id="location" value={customerData.location} onChange={handleChange} required />
            </div>
            <div class="input-data">
                <label for="">Contact</label>
                <div class="underline"></div>
                <input type="text" id="contact" value={customerData.contact} onChange={handleChange} pattern="[6789][0-9]{9}" placeholder="MUST be 10 digits" required />
            </div>
        </div>
        <div class="form-row submit-btn">
            <div class="input-data">
                <div class="inner"></div>
                <input type="submit" value="REGISTER"/>
            </div>
        </div>
      </form>
 </div>
      
    </div>
  );
}