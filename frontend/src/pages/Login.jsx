import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, Eye, EyeOff, Lock, User } from 'lucide-react';
import './Login.css';

import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // const response = await api.post('/auth/login', {
      //   email: id, // Assuming 'id' is email/username based on backend
      //   password: password,
      //   role: role.toUpperCase() // Adjust if backend expects specific format
      // });

      // Simulate successful response
      const response = {
        data: {
          token: 'dummy-token-12345',
          role: role // User the selected role
        }
      };

      // Assuming response.data contains { token, role, ... }
      const { token, role: userRole } = response.data;

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole || role); // Fallback to selected role if not in response

      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      console.error('Login failed', err);
      setError(err.response?.data?.message || 'Invalid credentials or server error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header Icon */}
        <div className="icon-wrapper">
          <Landmark className="bank-icon" size={32} />
        </div>

        {/* Title */}
        <h1 className="welcome-text">Welcome Back</h1>
        <p className="subtitle-text">Securely log in to your banking dashboard</p>

        {/* Role Toggle */}
        <div className="role-toggle">
          <button
            type="button"
            className={`toggle-btn ${role === 'user' ? 'active' : ''}`}
            onClick={() => { setRole('user'); setError(''); }}
          >
            User
          </button>
          <button
            type="button"
            className={`toggle-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => { setRole('admin'); setError(''); }}
          >
            Admin
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="login-form">
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="id">Username or Client ID</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="id"
                placeholder="Enter your ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Forgot Password */}
          <div className="forgot-password">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            <Lock size={16} className="btn-icon" /> Sign In
          </button>

          {/* Sign Up Link */}
          {role === 'user' && (
            <div className="signup-text">
              Don't have an account? <span className="signup-link" onClick={() => navigate('/signup')}>Sign up</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
