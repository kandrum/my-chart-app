// Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Add useDispatch import
import { toggleSidebarVisibility } from './redux/actions/uiAction';
import user from './user.png';
import './style/Headerstyle.css';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Use useDispatch hook
  const userType = useSelector((state) => state.userType);

  console.log("Header",userType);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const goToRegister = () => {
    if (userType.result.role === "admin"){
      navigate('/register');
    } else {
      alert("You do not have access to Register user");
    }
  };

  const goToLogin = () => {
    navigate('/');
  };

  // Call this function when the menu button is clicked
  const toggleSidebar = () => {
    dispatch(toggleSidebarVisibility());
  };

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
            <button onClick={goToRegister} className="dropdown-link">Register</button>
            <button onClick={goToLogin} className="dropdown-link">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
