import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const linkStyle = {
    marginRight: '16px',
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
  };

  const activeStyle = {
    color: 'blue',
    fontWeight: '700',
  };

  return (
    <nav style={{ padding: '10px 20px', background: '#eee', marginBottom: '20px' }}>
      <NavLink to="/" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>Home</NavLink>
      <NavLink to="/cart" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>Cart</NavLink>
      <NavLink to="/orders" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>Orders</NavLink>
      <NavLink to="/users" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>Users</NavLink>
      <NavLink to="/recommendations" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>Recommendations</NavLink>
      <NavLink to="/admin" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>Admin</NavLink>
      <NavLink to="/login" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>Login</NavLink>
      <NavLink to="/register" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>Register</NavLink>
    </nav>
  );
}

export default Navbar;
