import React, { useState } from 'react';
import user from './user.png';
import './style/Headerstyle.css'

function Header({ toggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="header-container">
      <button onClick={toggleSidebar} className="menu-button">
        ☰
      </button>
      <h1 className="header-title">Graph Visualization</h1>
      <div className="relative">
        <button onClick={toggleDropdown} className="user-button">
          <img src={user} alt="avatar" className="user-avatar" />
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <a href="#" className="dropdown-link">Settings</a>
            <a href="#" className="dropdown-link">Help</a>
            <a href="#" className="dropdown-link">Logout</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
