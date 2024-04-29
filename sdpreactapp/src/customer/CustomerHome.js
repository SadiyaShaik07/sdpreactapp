import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './customer.css';
import config from '../config'
export default function CustomerHome() 
{
  const [customerData, setcustomerData] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setcustomerData(parsedCustomerData)
    }
  }, []);

  const [fooditems, setFoodItems] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(`${config.url}/viewfooditems/`);
      setFoodItems(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchFoodItems();
  }); // Remove the dependency array

  const orderFoodItem = async (foodid, customeremail, customerlocation, quantity) => {
    try 
    {
      const response = await axios.post(`${config.url}/orderfood`, { foodid, customeremail, customerlocation, quantity });
      fetchFoodItems();
      setMessage(response.data);
      setError('');
    } 
    catch (error) 
    {
      setError(error.response.data);
      setMessage('');
    }
  }
  

  return (
    <div className="container">
      <div id="header">
        {message ? (
          <h4 align="center">{message}</h4>
        ) : (
          <h4 align="center" style={{ color: "red" }}>{error}</h4>
        )}
      </div>
      <div className="cards">
        {Array.isArray(fooditems) && fooditems.length > 0 ? (
          fooditems.map((item, index) => (
            <div className="card" key={index}>
              <div className="card-image">
                <img src={item.imageUrl} alt='foodimage'/>
              </div>
              <div className="card-text">
                <p className="card-meal-type">{item.seller.restaurant}</p>
                <h2 className="card-title">{item.foodname}</h2>
                <div className="quantity-input">
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="card-price">{item.foodprice}</div>
              <div className="button-wrapper"> 
                <button className="btn fill" onClick={() => orderFoodItem(item.foodid,customerData.email,customerData.location,quantity)}>Order Now</button>
              </div>
            </div>
          ))
        ) : (
          <div>Data Not Found</div>
        )}
      </div>
    </div>
  );
  
  
}