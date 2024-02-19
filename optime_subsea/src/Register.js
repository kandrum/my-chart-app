import React, { useState } from 'react';
import './style/Registerstyle.css'

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password, userRole });
    // Here, you would typically handle the form submission, such as sending data to a backend server
  };

  return (
    <div className="background-container">
    <form onSubmit={handleSubmit} className="form-container">
      <div className="mb-4">
        <label htmlFor="username" className="form-label">Enter Username</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-input" />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label">Enter Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
      </div>
      <div className="mb-4">
        <label htmlFor="role" className="form-label"> Select User Role</label>
        <select id="role" value={userRole} onChange={(e) => setUserRole(e.target.value)} className="form-select">
          <option value="">Select a role</option>
          <option value="supervisor">Supervisor</option>
          <option value="user">User</option>
        </select>
      </div>
      <button type="submit" className="submit-button">Register</button>
    </form>
    </div>
  );
}

export default Register;
