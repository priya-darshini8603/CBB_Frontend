import React, { useState } from "react";
import api from "../services/api";
import { Phone, KeyRound, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
  setError("");
  const cleanPhone = phone.replace(/\D/g, "");

  if (cleanPhone.length !== 10) {
    setError("Enter valid 10 digit phone number");
    return;
  }

  setLoading(true);

  try {
    await api.post("/auth/forgot-password-phone", {
      phone: cleanPhone,
    });

    toast.success("OTP sent successfully");
    setStep(2);

  } catch (err) {
    setError(err.response?.data || "Phone number not registered");
  }

  setLoading(false);
};

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    setError("");
    const cleanPhone = phone.replace(/\D/g, "");

    if (otp.length !== 6) {
      setError("Enter valid 6 digit OTP");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/verify-phone-otp", {
        phone: cleanPhone,
        otp: otp,
      });
      setStep(3);
    } catch (err) {
      setError(err.response?.data || "Invalid or expired OTP");
    }

    setLoading(false);
  };

  // ================= RESET PASSWORD =================
  const resetPassword = async () => {
    setError("");
    const cleanPhone = phone.replace(/\D/g, "");

    if (newPassword.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/reset-password-phone", {
        phone: cleanPhone,
        newPassword: newPassword,
      });


      toast.success("Password Reset Successful ✔ Login now");
      window.location.href = "/";


    } catch (err) {
      setError(err.response?.data || "Reset failed");
    }

    setLoading(false);
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">

        <button className="back-btn" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to Login
        </button>

        <h2>Reset Your Password</h2>
        <p className="subtitle">Secure account recovery</p>

        {/* STEP 1 → PHONE */}
        {step === 1 && (
          <div className="form">
            <div className="input">
              <Phone size={16} />
              <input
                type="tel"
                placeholder="Registered Phone Number"
                value={phone}
                maxLength={10}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, ""))
                }
              />
            </div>

            <button onClick={sendOtp} disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* STEP 2 → OTP */}
        {step === 2 && (
          <div className="form">
            <div className="input">
              <KeyRound size={16} />
              <input
                type="text"
                placeholder="Enter 6 digit OTP"
                value={otp}
                maxLength={6}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
              />
            </div>

            <button onClick={verifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {/* STEP 3 → RESET PASSWORD */}
        {step === 3 && (
          <div className="form">
            <div className="input">
              <Lock size={16} />
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
              />
            </div>

            <button onClick={resetPassword} disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default ForgotPassword;