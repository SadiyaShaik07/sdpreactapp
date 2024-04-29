import React, { useState } from 'react';
import axios from 'axios';
import config from '../config'

export default function AddSeller() 
{
  //formData state variable
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    restaurant: '',
    username: '',
    email: '',
    address: '',
    contact: ''
  });

  //message state variable
  const [message, setMessage] = useState('');
  //error state variable
  const [error, setError] = useState('');

  const handleChange = (e) => 
  {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const changetext = (e) => {
    const txt = e.target.value.toUpperCase()
    e.target.value = txt
  }

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/addseller`, formData);
      if (response.status === 200) 
      {
        setFormData({
          fullname: '',
          gender: '',
          dateofbirth: '',
          restaurant: '',
          username: '',
          email: '',
          address: '',
          contact: ''
        });
      }
      setMessage(response.data);
      setError('');
    } 
    catch(error) 
    {
      setError(error.response.data);
      setMessage('');
    }
  };
  
  return (
    <div>
      <h3 align="center"><u>Add Seller</u></h3>
      {
        message ? <h4 style={{color: 'green',textAlign: 'center'}}>{message}</h4> : <h4 align="center">{error}</h4>
      }

<div class="formcontainer">
    <form onSubmit={handleSubmit}>
        <div class="form-row">
            <div class="input-data">
                <label for="">Full Name</label>
                <div class="underline"></div>
                <input type="text" id="fullname" value={formData.fullname} onChange={handleChange} onKeyUp={changetext} required />
            </div>
            <div class="select-data">
                <label for="">Select Gender</label>
                <div class="underline"></div>
                <select id="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
            </div>
            <div class="input-data">
                <label for="">Date of Birth</label>
                <div class="underline"></div>
                <input type="date" id="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
            </div>
            <div class="input-data">
                <label for="">Restaurant Name</label>
                <div class="underline"></div>
                <input type="text" id="restaurant" value={formData.restaurant} onChange={handleChange} required />
            </div>
            <div class="input-data">
                <label for="">Username</label>
                <div class="underline"></div>
                <input type="text" id="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div class="input-data">
                <label for="">Email</label>
                <div class="underline"></div>
                <input type="email" id="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div class="input-data">
                <label for="">Address</label>
                <div class="underline"></div>
                <textarea type="text" id="address" value={formData.address} onChange={handleChange} required />
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