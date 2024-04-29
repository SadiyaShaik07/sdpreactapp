import React, { useState } from 'react';
import axios from 'axios';
import config from '../config'
export default function Contact() {
  const [formData, setFormData] = useState({
    username: '',
    message: '',
  });

  const [txt, setTxt] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/insertcontact`, formData);
      if (response.status === 200) {
        setFormData({
          username: '',
          message: '',
        });
      }
      setTxt(response.data);
      setError('');
    } catch (error) {
      setError(error.response.data);
      setTxt('');
    }
  };

  return (
    <div>
      <h3 align="center"><u>Contact Us</u></h3>
      {
        txt ? <h4 style={{ color: 'green', textAlign: 'center' }}>{txt}</h4> : <h4 style={{ color: 'red', textAlign: 'center' }}>{error}</h4>
      }

      <div className="formcontainer">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <label htmlFor="username">Username</label>
              <div className="underline"></div>
              <input type="text" id="username" value={formData.username} onChange={handleChange} required />
            </div>

            <div className="input-data">
              <label htmlFor="message">Tell us all about it</label>
              <div className="underline"></div>
              <input type="text" id="message" value={formData.message} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row submit-btn">
            <div className="input-data">
              <div className="inner"></div>
              <input type="submit" value="SUBMIT" />
            </div>
          </div>
        </form>
      </div>

      {/* Footer section */}
      <footer className="footer">
        <div className="owner-contact">
          <h4>Owner Contact Information</h4>
          <p>Email: hungryhub@gmail.com</p>
          <p>Phone: +91 9600345672</p>
        </div>
        <div className="other-info">
          <h4>Other Information</h4>
          <p>Discover a world of flavors with our diverse menu selection.</p>
          <p>Enjoy fast and reliable delivery straight to your doorstep.</p>
        </div>
      </footer>
    </div>
  );
}
