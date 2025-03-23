import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Pass the response data (token + user) to onLogin
      onLogin(response.data);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Side (Gradient/Image) */}
        <div className="col-md-6 bg-primary d-flex flex-column justify-content-center align-items-center text-white">
          <h1 className="display-4">Welcome Back!</h1>
          <p className="lead">Login to manage your tasks.</p>
        </div>

        {/* Right Side (Login Form) */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <p className="mt-3 text-center">
              Don't have an account? <a href="/register">Register here</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;