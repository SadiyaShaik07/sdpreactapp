import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.css'
import Home from './Home';
import About from './About';
import CustomerLogin from './../customer/CustomerLogin';
import Registration from './../customer/Registration';
import Contact from './Contact';
import AdminLogin from './../admin/AdminLogin';
import SellerLogin from '../seller/SellerLogin';
import config from '../config'
export default function MainNavBar({ onAdminLogin,onCustomerLogin,onSellerLogin }) {
  return (
    <div>
      <nav class="menu">
  <ol>
    <li class="menu-item"><a href="/">Home</a></li>
    <li class="menu-item"><a href="/about">About</a></li>
    <li class="menu-item"><a href="/registration">Registration</a></li>
    <li class="menu-item">
      <a href="#0">Login</a>
      <ol class="sub-menu">
        <li class="menu-item"><a href="/customerlogin">Customer</a></li>
        <li class="menu-item"><a href="/sellerlogin">Seller</a></li>
        <li class="menu-item"><a href="/adminlogin">Admin</a></li>
      </ol>
    </li>
    <li class="menu-item"><a href="/contact">Contact</a></li>
  </ol>
</nav>

      <Routes>
        <Route path="/" element={<Home/>} exact />
        <Route path="/about" element={<About/>} exact />
        <Route path="/registration" element={<Registration/>} exact />
        <Route path="/customerlogin" element={<CustomerLogin onCustomerLogin={onCustomerLogin}/>} exact />
        <Route path="/adminlogin" element={<AdminLogin onAdminLogin={onAdminLogin}/>} exact />
        <Route path="/sellerlogin" element={<SellerLogin onSellerLogin={onSellerLogin}/>} exact />
        <Route path="/contact" element={<Contact/>} exact />
      </Routes>
    </div>
  );
}