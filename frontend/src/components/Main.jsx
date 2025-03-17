import React from 'react';
import '../styles/Main.css';
import waterfall from '../assets/water.jpg';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="main_page">
      {/* Background Image */}
      <div className="background_container">
        <img src={waterfall} alt="Waterfall Background" className="background_image" />
      </div>

      {/* Glassmorphism Box on Left */}
      <div className="glass_box">
        <h1>Welcome</h1>
        <p>Track your daily water intake and stay hydrated!</p>
        <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
};

export default Main;