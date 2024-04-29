import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './customer.css';
import config from '../config'
export default function CustomerOrders() {
    const [customerData, setCustomerData] = useState("");
    const [foodOrders, setFoodOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedCustomerData = localStorage.getItem('customer');
        if (storedCustomerData) {
            const parsedCustomerData = JSON.parse(storedCustomerData);
            setCustomerData(parsedCustomerData);
        }
    }, []); // Empty dependency array ensures it runs only once on mount

    useEffect(() => {
        if (customerData) {
            fetchFoodOrders();
        }
    }); 

    const fetchFoodOrders = async () => {
        try {
            const response = await axios.get(`${config.url}/foodorders/${customerData.email}`);
            setFoodOrders(response.data);
        } catch (error) {
            setError(error.response.data);
        }
    }

    const cancelOrder = async (orderId) => {
        try {
          await axios.delete(`${config.url}/cancelorder/${orderId}`);
          fetchFoodOrders();
        } catch (error) {
          console.error(error.message);
        }
      }

    return (
        <div className="table-container">
            <h3>Food Order Status</h3>
            {error && <h4 align="center" style={{ color: "red" }}>{error}</h4>}
            <table className="job-table mx-auto" align='center'>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Food ID</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Applied Time</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(foodOrders) && foodOrders.length > 0 ? (
                        foodOrders.map((foodorder, index) => (
                            <tr key={index}>
                                <td>{foodorder.orderId}</td>
                                <td>{foodorder.foodid}</td>
                                <td>{foodorder.quantity}</td>
                                <td>{foodorder.orderStatus}</td>
                                <td>{foodorder.orderedTime}</td>
                                <td>
                                    <button onClick={() => cancelOrder(foodorder.orderId)} className='button'>Cancel</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No Food Orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}