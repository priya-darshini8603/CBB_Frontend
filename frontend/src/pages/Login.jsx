import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import './Login.css';
import api from '../services/api';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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


        toast.success("OTP sent ✔ Check console/email");

      }
    } catch (err) {
      const msg = err.response?.data;
      if (msg === "USER_NOT_FOUND") setError("User not registered");
      else if (msg === "INVALID_PASSWORD") setError("Wrong password");
      else setError("Login failed");
    }

    setIsLoading(false);
  };

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
      const role = payload.role === "ADMIN" ? "admin" : "user";
      localStorage.setItem('role', role);

      if (role === "admin") navigate('/admin-dashboard');
      else navigate('/user-dashboard');

    } catch {
      setError("Invalid or expired OTP");
    }

    setIsLoading(false);
  };

  return (
    <div className="login-page">

      <div className="login-wrapper">

        {/* LEFT BRAND */}
        <div className="brand">
          <Landmark size={50} />
          <h1>CoreBank</h1>
          <p>Secure • Fast • Modern Banking</p>
        </div>

        {/* LOGIN CARD */}
        <div className="card">
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to your account</p>

          <form onSubmit={handleLogin}>

            <div className="input">
              <Mail size={16} />
              <input
                type="email"
                placeholder="Email"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>

            <div className="input">
              <Lock size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="forgot" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </p>

            {/* ERROR + REGISTER BUTTON */}
            {error && (
              <div className="error">

                {error}

                {/* ONLY when user not registered */}
                {error === "User not registered" && (
                  <button
                    type="button"
                    className="register-btn"
                    onClick={() => navigate('/signup')}
                  >
                    Create New Account
                  </button>
                )}

              </div>
            )}

            <button className="btn" disabled={isLoading}>
              {isLoading ? "Please wait..." : "Sign In"}
            </button>

            {showOtpBox && (
              <div className="otp">
                <label>Enter OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="6 digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  type="button"
                  className="btn"
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
    </div>
  );
};

export default Login;