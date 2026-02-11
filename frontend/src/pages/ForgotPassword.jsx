import React, { useState } from "react";
import api from "../services/api";
import "./ForgotPassword.css";

const ForgotPassword = () => {

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= SEND OTP =================
  const sendOtp = async () => {
    setError("");

    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      setError("Enter valid 10 digit phone");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/forgot-password-phone", {
        phone: cleanPhone
      });

      alert("OTP Sent ✔ Check backend console/Phone Number");
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data || "Phone number not registered"
      );
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
        otp: otp
      });

      setStep(3);
    } catch (err) {
      setError(
        err.response?.data || "Invalid or expired OTP"
      );
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
        newPassword: newPassword
      });

      alert("Password Reset Successful ✔ Login now");
      window.location.href = "/";
    } catch (err) {
      setError(
        err.response?.data || "Reset failed"
      );
    }

    setLoading(false);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">

        <h2>Forgot Password</h2>

        {/* STEP 1 → PHONE */}
        {step === 1 && (
          <>
            <input
              type="tel"
              placeholder="Enter Registered Phone"
              value={phone}
              maxLength={10}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
            />

            <button onClick={sendOtp} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 → OTP */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              maxLength={6}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
            />

            <button onClick={verifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* STEP 3 → RESET PASSWORD */}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
            />

            <button onClick={resetPassword} disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {error && <p className="error">{error}</p>}

      </div>
    </div>
  );
};

export default ForgotPassword;