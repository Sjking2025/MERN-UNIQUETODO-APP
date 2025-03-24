import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isAuthenticated, onLogout, user }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">To-Do App</Link>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link to="/mood-tracker">Mood Tracker</Link>
              <span>Points: {user?.points || 0}</span>
              <button onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;