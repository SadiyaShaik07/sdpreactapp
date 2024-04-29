import React from 'react'
import { Route, Routes, useNavigate} from 'react-router-dom'
import './customer.css'
import CustomerHome from './CustomerHome';
import CustomerProfile from './CustomerProfile'
import CustomerOrders from './CustomerOrders';
import UpdateCustomerProfile from './UpdateCustomerProfile';
import config from '../config'
export default function CustomerNavBar() 
{
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isCustomerLoggedIn');
    localStorage.removeItem('customer');
    navigate('/customerlogin');
    window.location.reload()
  };

  return (
    <div>

<nav class="menu">
  <ol>
    <li class="menu-item"><a href="/customerhome">Home</a></li>
    <li class="menu-item"><a href="/customerorders">My Orders</a></li>
    <li class="menu-item"><a href="/customerprofile">Profile</a></li>
    <li class="menu-item"><a href="/customerlogin" onClick={handleLogout}>Logout</a></li>
  </ol>
</nav>
        <Routes>
         <Route path="/customerhome" element={<CustomerHome/>} exact/>
         <Route path="/customerprofile" element={<CustomerProfile/>} exact/>
         <Route path="/customerorders" element={<CustomerOrders/>} exact/>
         <Route path="/updatecustomerprofile" element={<UpdateCustomerProfile/>} exact/>
        </Routes>

    </div>
  )
}