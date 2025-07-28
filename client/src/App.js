import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Users from './pages/Users';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import Recommendations from './pages/Recommendations';
import Navbar from './pages/Navbar';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/users" element={<Users />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/recommendations" element={<Recommendations />} />
        
        {/* 404 Not Found Route */}
        <Route path="*" element={<h2 style={{ padding: '20px' }}>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
