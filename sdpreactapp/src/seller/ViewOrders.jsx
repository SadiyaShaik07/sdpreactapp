import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './seller.css';
import config from '../config'
export default function ViewOrders() {

  const [sellerData, setSellerData] = useState("");
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData)
    }
  }, []);

  const [foodOrders, setFoodOrders] = useState([]);

  const fetchFoodOrders = async () => {
    try 
    {
      const response = await axios.get(`${config.url}/vieworders/${sellerData.username}`);
      setFoodOrders(response.data);
    } 
    catch (error) 
    {
      setError(error.response.data);
    }
  }

  useEffect(() => {
    fetchFoodOrders();
  }); 

  const handleStatusChange = async (orderId, status) => {
    try 
    {
      const response = await axios.post(`${config.url}/changeorderstatus`, { orderId, status });
      fetchFoodOrders();
      setMessage(response.data);
      setError(''); // Set error to ""
    } 
    catch (error) 
    {
      setError(error.response.data);
      setMessage(''); // Set message to ""
    }
  };

  return (
    <div className="table-container">
        <h3>Food Orders</h3>
        {
          message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
        }
        <table className="job-table mx-auto" align='center'>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Food ID</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Applied Time</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(foodOrders) && foodOrders.length > 0 ? (
                    foodOrders.map((foodOrder, index) => (
                        <tr key={index}>
                            <td>{foodOrder.orderId}</td>
                            <td>{foodOrder.foodid}</td>
                            <td>{foodOrder.quantity}</td>
                            <td>{foodOrder.orderStatus}</td>                           
                            <td>{foodOrder.orderedTime}</td>
                            <td>
                              <button className='accepted' onClick={() => handleStatusChange(foodOrder.orderId,"ACCEPT")}>Accept</button>
                              <button className='rejected' onClick={() => handleStatusChange(foodOrder.orderId,"REJECT")}>Reject</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No Orders found</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);
}