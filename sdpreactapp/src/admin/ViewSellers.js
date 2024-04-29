import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'
export default function ViewSellers() {
  const [sellers, setSellers] = useState([]);

  const fetchSellers = async () => {
    try {
      const response = await axios.get(`${config.url}/viewsellers`);
      setSellers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchSellers();
  }, []);

  const deleteSeller = async (username) => {
    try {
      await axios.delete(`${config.url}/deleteseller/${username}`);
      fetchSellers();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sellers</h1>
  
      <div className="table-container">
        <table className="job-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Restaurant</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(sellers) && sellers.length > 0 ? (
              sellers.map((seller, index) => (
                <tr key={index}>
                  <td>{seller.fullname}</td>
                  <td>{seller.gender}</td>
                  <td>{seller.dateofbirth}</td>
                  <td>{seller.restaurant}</td>
                  <td>{seller.username}</td>
                  <td>{seller.email}</td>
                  <td>{seller.address}</td>
                  <td>{seller.contact}</td>
                  <td>
                    <button onClick={() => deleteSeller(seller.username)} className='button'>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">Data Not Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}