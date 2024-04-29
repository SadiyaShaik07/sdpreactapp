import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './seller.css';
import config from '../config'
export default function SellerMenu() {
  const navigate = useNavigate();
  const redirect = () => {
  navigate("/addfooditem")
  }

  const [sellerData, setSellerData] = useState("");

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData)
    }
  }, []);

  const [fooditems, setFooditems] = useState([]);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(`${config.url}/viewfooditems/${sellerData.username}`);
      setFooditems(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchFoodItems();
  }); 

  return (
    <div className="table-container">
      <h3>Your Menu</h3>
      <table className="job-table mx-auto" align='center'>
        <thead>
          <tr>
            <th>Food ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(fooditems) && fooditems.length > 0 ? (
            fooditems.map((fooditem, index) => (
              <tr key={index}>
                <td>{fooditem.foodid}</td>
                <td>{fooditem.foodname}</td>
                <td>{fooditem.fooddescription}</td>
                <td>{fooditem.foodcategory}</td>
                <td>{fooditem.foodsubcategory}</td>
                <td>{fooditem.foodprice}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Data Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
      <br/>
      <div class="butns">
        <button onClick={redirect}>Add food item</button>
        </div>
    </div>
  );
}