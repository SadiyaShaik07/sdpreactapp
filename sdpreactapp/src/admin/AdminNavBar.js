import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './admin.css'
import config from '../config'
import AdminHome from './AdminHome';
import ViewCustomers from './ViewCustomers';
import AddSeller from './AddSeller';
import ViewSellers from './ViewSellers'
import ViewContacts from './ViewContacts';

export default function AdminNavBar() 
{
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');
    navigate('/adminlogin');
    window.location.reload()
  };

  return (
    <div>

<nav class="menu">
  <ol>
    <li class="menu-item"><a href="/adminhome">Home</a></li>
    <li class="menu-item"><a href="/viewcustomers">Customers</a></li>
    <li class="menu-item">
      <a href="#0">Sellers</a>
      <ol class="sub-menu">
        <li class="menu-item"><a href="/addseller">Add Seller</a></li>
        <li class="menu-item"><a href="/viewsellers">View Sellers</a></li>
      </ol>
    </li>
    <li class="menu-item"><a href="/viewcontacts">Contacts</a></li>
    <li class="menu-item"><a href="/adminlogin" onClick={handleLogout}>Logout</a></li>
  </ol>
</nav> 

         <Routes>
         <Route path="/adminhome" Component={AdminHome} exact/>
         <Route path="/viewcustomers" Component={ViewCustomers} exact/>
         <Route path="/addseller" Component={AddSeller} exact/>
         <Route path="/viewsellers" Component={ViewSellers} exact/>
         <Route path="/viewcontacts" Component={ViewContacts} exact/>
        </Routes>

    </div>
  )
}