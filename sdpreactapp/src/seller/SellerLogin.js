import React, { useState } from 'react';
import './seller.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config'

export default function SellerLogin({onSellerLogin}) 
{
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/checksellerlogin`, formData);
      if (response.data!=null) 
      {
        onSellerLogin();

        localStorage.setItem('seller', JSON.stringify(response.data));
        navigate("/sellerhome")
      } 
      else 
      {
        setMessage("Login Failed")
        setError("")
      }
    } 
    catch (error) 
    {
      setMessage("")
      setError(error.message)
    }
  };

  return (
    <div>
      <h3 align="center"><u>Seller Login</u></h3>
      {
        message ? <h4 style={{color: 'red',textAlign: 'center'}}>{message}</h4> : <h4 align="center">{error}</h4>
      }
<div class="formcontainer">
    <form onSubmit={handleSubmit}>
        <div class="form-row">
            <div class="input-data">
                <label for="">Username</label>
                <div class="underline"></div>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div class="input-data">
                <label for="">Password</label>
                <div class="underline"></div>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
        </div>
        <div class="form-row submit-btn">
            <div class="input-data">
                <div class="inner"></div>
                <input type="submit" value="LOGIN"/>
            </div>
        </div>
      </form>
 </div>
    </div>
  );
}