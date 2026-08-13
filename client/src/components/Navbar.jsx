import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  // Basic logout placeholder (will integrate with auth later)
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onMenuClick}>
          ☰
        </button>
        <Link to="/dashboard" className="navbar-brand">
          SIS Portal
        </Link>
      </div>
      <div className="navbar-right">
        <span className="user-name">Admin User</span>
        <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
