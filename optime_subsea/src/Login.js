import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style/Loginstyle.module.css';
import backgroundImage from './style/Image2.png'; // Import the background image

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      navigate('/home');
    };

    // Inline style for the background image
    const containerStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    };

    return (
      <div className={styles.container} style={containerStyle}> 
        <form onSubmit={handleSubmit} className={styles.form}> 
          <label className={styles.label}> 
            Username:
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className={styles.input} 
            />
          </label>
          <br />
          <label className={styles.label}> 
            Password:
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={styles.input} 
            />
          </label>
          <br />
          <button type="submit" className={styles.button}>Submit</button> 
        </form>
      </div>  
    );
}

export default Login;
