import React from 'react'
import { Route, Routes, useNavigate} from 'react-router-dom'
import './seller.css'
import SellerHome from './SellerHome';
import SellerProfile from './SellerProfile';
import SellerMenu from './SellerMenu';
import AddFoodItem from './AddFoodItem';
import ViewOrders from './ViewOrders';
import config from '../config'
export default function SellerNavBar() 
{
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isSellerLoggedIn');
    localStorage.removeItem('seller');

    navigate('/sellerlogin');
    window.location.reload()
  };

  return (
    <div>

<nav class="menu">
  <ol>
    <li class="menu-item"><a href="/sellerhome">Home</a></li>
    <li class="menu-item"><a href="/sellermenu">Menu</a></li>
    <li class="menu-item"><a href="/vieworders">Order Requests</a></li>
    <li class="menu-item"><a href="/sellerprofile">Profile</a></li>
    <li class="menu-item"><a href="/sellerlogin" onClick={handleLogout}>Logout</a></li>
  </ol>
</nav>
         <Routes>
         <Route path="/sellerhome" element={<SellerHome/>} exact/>
         <Route path="/sellerprofile" element={<SellerProfile/>} exact/>
         <Route path="/sellermenu" element={<SellerMenu/>} exact/>
         <Route path="/addfooditem" element={<AddFoodItem/>} exact/>
         <Route path="/vieworders" element={<ViewOrders/>} exact/>
        </Routes>

    </div>
  )
}