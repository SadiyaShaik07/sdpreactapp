import React, { useState,useEffect } from 'react';
import axios from 'axios';
import config from '../config'
export default function AddFoodItem() {

    const [sellerData, setSellerData] = useState("");

    useEffect(() => {
        const storedSellerData = localStorage.getItem('seller');
        if (storedSellerData) {
          const parsedSellerData = JSON.parse(storedSellerData);
          setSellerData(parsedSellerData)
        }
      }, []);

  const [formData, setFormData] = useState({
    foodname: '',
    fooddescription: '',
    foodcategory: '',
    foodsubcategory: '', 
    foodprice: '',
    seller: '',
    imageUrl: ''
  });

  // message state variable
  const [message, setMessage] = useState('');
  // error state variable
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/addfooditem`, { ...formData, seller: sellerData, restaurant:sellerData.restaurant });
      if (response.status === 200) {
        setFormData({
            foodname: '',
            fooddescription: '',
            foodcategory: '',
            foodsubcategory: '', 
            foodprice: '',
            seller: '',
            imageUrl: ''
        });
      }
      setMessage(response.data);
      setError("");
    } 
    catch (error) 
    {
      setError(error.response.data);
      setMessage(''); //set message to ""
    }
  };
  

  return (
    <div>
      <h3 align="center"><u>Add a new food item</u></h3>
      {
        message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
      }

<div class="formcontainer">
    <form onSubmit={handleSubmit}>
        <div class="form-row">
            <div class="input-data">
                <label for="">Name</label>
                <div class="underline"></div>
                <input type="text" id="foodname" value={formData.foodname} onChange={handleChange} required />
            </div>
            <div class="input-data">
                <label for="">Description</label>
                <div class="underline"></div>
                <textarea id="fooddescription" value={formData.fooddescription} onChange={handleChange} required />
            </div>
            <div class="select-data">
                <label for="">Category</label>
                <div class="underline"></div>
                <select id="foodcategory" value={formData.foodcategory} onChange={handleChange} required>
                    <option value="">---Select---</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="snacks">Snacks</option>
                    <option value="dinner">Dinner</option>
                    <option value="desserts">Desserts</option>
                </select>
            </div>
            <div class="select-data">
                <label for="">Sub Category</label>
                <div class="underline"></div>
                <select id="foodsubcategory" value={formData.foodsubcategory} onChange={handleChange} required>
                  <option value="">---Select---</option>
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                </select>
            </div>
            <div class="input-data">
                <label for="">Price</label>
                <div class="underline"></div>
                <input type="number" id="foodprice" value={formData.foodprice} onChange={handleChange} required />
            </div>
            <div class="input-data">
                <label for="">Image URL</label>
                <div class="underline"></div>
                <textarea id="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
            </div>
        </div>
        <div class="form-row submit-btn">
            <div class="input-data">
                <div class="inner"></div>
                <input type="submit" value="ADD"/>
            </div>
        </div>
      </form>
</div>
    </div>
  );
}