import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "CUSTOMER"
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone → allow only digits
    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "");
      setForm({ ...form, phone: onlyNumbers });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ================= REGISTER =================
  const register = async (e) => {
    e.preventDefault();
    setError("");

    // 🔴 FRONTEND PHONE VALIDATION
    if (form.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", form);
      alert("Registered Successfully ✔ Please Login");
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Registration failed"
      );
    }

    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2>Create Account</h2>

        <form onSubmit={register}>

          {/* FULL NAME */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* PHONE */}
          <input
            type="tel"
            name="phone"
            placeholder="Enter 10-digit phone"
            value={form.phone}
            onChange={handleChange}
            maxLength={10}
            pattern="[0-9]{10}"
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* ROLE */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="CUSTOMER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          {/* ERROR MESSAGE */}
          {error && <p className="error">{error}</p>}

          {/* BUTTON */}
          <button disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          {/* LOGIN LINK */}
          <p className="login-link">
            Already have account?{" "}
            <span onClick={() => navigate("/")}>Login</span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;