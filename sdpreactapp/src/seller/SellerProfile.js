import React, { useEffect, useState } from 'react';
import './seller.css';
import config from '../config'
export default function SellerProfile() {
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData);
    }
  }, []);

  return (
    sellerData ? (
      <section class="pitems">
      <div class="pcard">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVrSjh1CKEacW1eVu2lSn__vZKr3DJyyMppkgqzs2HW95BJceRVoZqJCVauT_f4CjRRJw&usqp=CAU" alt="Profile Picture"/>
        <p><strong>Full Name:</strong> {sellerData.fullname}</p>
        <p><strong>Gender:</strong> {sellerData.gender}</p>
        <p><strong>Date of Birth:</strong> {sellerData.dateofbirth}</p>
        <p><strong>Restaurant:</strong> {sellerData.restaurant}</p>
        <p><strong>Email:</strong> {sellerData.email}</p>
        <p><strong>Address:</strong> {sellerData.address}</p>
        <p><strong>Contact:</strong> {sellerData.contact}</p>
      </div>
      </section>
    ) : (
      <p>No Seller Data Found</p>
    )
  );
}