// Header.js
import React, { useState } from 'react';
import user from './user.png';

function Header({ toggleSidebar }) { // Corrected destructuring here
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="bg-blue-700 text-white flex justify-between items-center px-6 py-4">
      <button onClick={toggleSidebar} className="text-xl text-white focus:outline-none focus:shadow-outline">
        ☰
      </button>
      <h1 className="text-2xl font-bold">Graph Visualization</h1>
      <div className="relative">
        <button onClick={toggleDropdown} className="flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline p-2">
          <img src={user} alt="avatar" className="rounded-full w-8 h-8" />
          {/*<svg className="ml-2 w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7"></path>
  </svg>*/}
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-10">
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-purple-200">Settings</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-purple-200">Help</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-purple-200">Logout</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
