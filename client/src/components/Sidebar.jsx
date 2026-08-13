import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Menu</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/dashboard" onClick={onClose} className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/students" onClick={onClose} className={({ isActive }) => (isActive ? 'active' : '')}>
            Students
          </NavLink>
        </li>
        <li>
          <NavLink to="/students/add" onClick={onClose} className={({ isActive }) => (isActive ? 'active' : '')}>
            Add Student
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
