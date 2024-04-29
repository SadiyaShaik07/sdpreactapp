import React, { useState } from 'react';
import axios from 'axios';
import config from '../config'
export default function Registration() 
{
  //formData state variable is initialized with all required keys and empty values
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    location: '',
    contact: ''
  });

  //message state variable
  const [message, setMessage] = useState('');
  //error state variable
  const [error, setError] = useState('');

  const handleChange = (e) => 
  {
    
    setFormData({...formData, [e.target.id]: e.target.value});
    
    // It updates the state formData by adding or updating a property with a key equal to 
    //the ID of the input field 
    //that triggered the change event (e.target.id). The value of this property is 
    //set to the new value entered in that input field (e.target.value).
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/insertcustomer`, formData);
      if (response.status === 200) 
      {
        //It will set all fields to ""
        setFormData({
          fullname: '',
          gender: '',
          dateofbirth: '',
          email: '',
          password: '',
          location: '',
          contact: ''
        });
      }
      setMessage(response.data);
      setError(''); //set error to ""
    } 
    catch(error) 
    {
      setError("This email is already registered !");
      setMessage(''); //set message to ""
    }
  };
  
  return (
    
    <div>
      <h3 align="center"><u>Customer Registration</u></h3>
      {
        message ? <h4 style={{color: 'green',textAlign: 'center'}}>{message}</h4> : <h4 style={{color: 'red',textAlign: 'center'}}>{error}</h4>
      }

<div class="formcontainer">
    <form onSubmit={handleSubmit}>
        <div class="form-row">
            <div class="input-data">
                <label for="">Full Name</label>
                <div class="underline"></div>
                <input type="text" id="fullname" value={formData.fullname} onChange={handleChange} required />
            </div>
            <div class="select-wrapper">
  <label for="gender">Gender</label>
                <div class="underline"></div>
  <div class="custom-dropdown">
    <select id="gender" value={formData.gender} onChange={handleChange} required>
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
                <input type="date" id="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
            </div>
            <div class="input-data">
                <label for="">Email</label>
                <div class="underline"></div>
                <input type="email" id="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="input-data">
  <label htmlFor="password">Password</label>
  <div className="underline"></div>
  <input 
    type="password" 
    id="password" 
    value={formData.password} 
    onChange={handleChange} 
    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
    title="Password must contain at least one number, one uppercase and one lowercase letter, and at least 8 or more characters" 
    required 
  />
</div>

            <div class="input-data">
                <label for="">Location</label>
                <div class="underline"></div>
                <input type="text" id="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div class="input-data">
                <label for="">Contact</label>
                <div class="underline"></div>
                <input type="text" id="contact" value={formData.contact} onChange={handleChange} pattern="[6789][0-9]{9}" placeholder="MUST be 10 digits" required />
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