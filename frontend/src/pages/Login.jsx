import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, Eye, EyeOff, Lock } from 'lucide-react';
import './Login.css';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await api.post('/auth/login', {
        email: id,
        password: password
      });

      if (res.data === "OTP_SENT") {
        setShowOtpBox(true);
        alert("OTP sent ✔ Check Spring Boot console");
      }

    } catch (err) {
      const msg = err.response?.data;

      if (msg === "USER_NOT_FOUND") setError("User not registered");
      else if (msg === "INVALID_PASSWORD") setError("Wrong password");
      else setError("Login failed");
    }

    setIsLoading(false);
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Enter valid OTP");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/verify-otp', {
        email: id,
        otp: otp
      });

      const token = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');

      const payload = JSON.parse(atob(token.split('.')[1]));
      const roleFromToken = payload.role;

      const role = roleFromToken === "ADMIN" ? "admin" : "user";
      localStorage.setItem('role', role);

      if (role === "admin") navigate('/admin-dashboard');
      else navigate('/user-dashboard');

    } catch (err) {
      console.log(err);
      setError("Invalid or expired OTP");
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="icon-wrapper">
          <Landmark className="bank-icon" size={32} />
        </div>

        <h1 className="welcome-text">Welcome Back</h1>

        <form onSubmit={handleLogin} className="login-form">

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <p className="forgot-link">
  <span onClick={() => navigate("/forgot-password")}>
    Forgot Password?
  </span>
</p>

          {/* ERROR + REGISTER BUTTON */}
          {error && (
            <div className="error-message">
              {error}

              {error === "User not registered" && (
                <div style={{ marginTop: "10px" }}>
                  <button
                    type="button"
                    className="submit-btn"
                    style={{ background: "#16a34a" }}
                    onClick={() => navigate('/signup')}
                  >
                    Register Now
                  </button>
                </div>
              )}
            </div>
          )}

          <button className="submit-btn" disabled={isLoading}>
            <Lock size={16} />
            {isLoading ? "Please wait..." : "Sign In"}
          </button>

          {/* OTP BOX */}
          {showOtpBox && (
            <div className="otp-box">
              <label>Enter OTP</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                type="button"
                className="submit-btn"
                onClick={verifyOtp}
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;