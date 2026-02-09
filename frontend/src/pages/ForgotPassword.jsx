import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Landmark,
    Mail,
    ArrowRight,
    KeyRound,
    Lock,
    Eye,
    EyeOff,
    ArrowLeft,
    RotateCw,
    Send
} from 'lucide-react';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Verify, 2: Reset

    // Step 1 State
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    // Step 2 State
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Strength Calculation Logic
    const calculateStrength = (password) => {
        let score = 0;
        if (!password) return 0;
        if (password.length > 8) score += 1;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[^a-zA-Z0-9]/.test(password)) score += 1;
        return score;
    };

    const strengthScore = calculateStrength(newPassword);

    const getStrengthLabel = () => {
        switch (strengthScore) {
            case 0: return 'Very Weak';
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Strong';
            default: return '';
        }
    };

    const getStrengthColor = () => {
        switch (strengthScore) {
            case 0: return '#E2E8F0';
            case 1: return '#EF4444'; // Red
            case 2: return '#F59E0B'; // Orange
            case 3: return '#3B82F6'; // Blue
            case 4: return '#10B981'; // Green
            default: return '#E2E8F0';
        }
    };

    // Handlers
    const handleSendOtp = () => {
        if (!email) return;
        setOtpSent(true);
        // Simulate API call
        console.log(`OTP sent to ${email}`);
    };

    const handleVerify = (e) => {
        e.preventDefault();
        if (otp.length === 6) {
            setStep(2);
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        // Simulate API call
        console.log('Password reset successfully');
        navigate('/');
    };

    return (
        <div className="fp-container">
            {/* Navbar for Step 1 */}
            {step === 1 && (
                <nav className="fp-nav">
                    <div className="nav-brand">
                        <div className="nav-icon-box">
                            <Landmark size={20} color="white" />
                        </div>
                        <span>Banking System</span>
                    </div>

                </nav>
            )}

            <div className="fp-content">
                <div className="fp-card">

                    {/* Step 1: Email & OTP Verification */}
                    {step === 1 && (
                        <>
                            <div className="card-header-center">
                                <span className="security-badge">
                                    <Lock size={12} /> SECURE VERIFICATION
                                </span>
                                <h1 className="fp-title">Reset Your Password</h1>
                                <p className="fp-subtitle">
                                    Enter your registered email to receive a verification code.
                                </p>
                            </div>

                            <form onSubmit={handleVerify}>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <div className="input-box">
                                        <Mail className="input-icon" size={18} />
                                        <input
                                            type="email"
                                            placeholder="alex.smith@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="send-otp-link"
                                        onClick={handleSendOtp}
                                    >
                                        <Send size={14} /> Send OTP
                                    </button>
                                </div>

                                <div className="form-group">
                                    <label>One-Time Password (OTP)</label>
                                    <div className={`input-box ${!otpSent ? 'disabled' : ''}`}>
                                        <KeyRound className="input-icon" size={18} />
                                        <input
                                            type="text"
                                            placeholder="0 0 0 0 0 0"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            maxLength={6}
                                            disabled={!otpSent}
                                            style={{ letterSpacing: '4px' }}
                                        />
                                    </div>

                                </div>

                                <button type="submit" className="action-btn-blue">
                                    Verify & Reset <ArrowRight size={18} />
                                </button>
                            </form>

                            <div className="card-footer">
                                Remembered your password? <span onClick={() => navigate('/')}>Login</span>
                            </div>
                        </>
                    )}

                    {/* Step 2: Set New Password */}
                    {step === 2 && (
                        <>
                            <div className="card-header-center">
                                <div className="brand-header">
                                    <div className="brand-icon-box">
                                        <Landmark size={24} color="white" />
                                    </div>
                                    <h3>Banking System</h3>
                                </div>

                                <h1 className="fp-title">Set New Password</h1>
                                <p className="fp-subtitle">
                                    Your identity has been verified. Choose a strong password to protect your account.
                                </p>
                            </div>

                            <form onSubmit={handleResetPassword}>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <div className="input-box">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter at least 8 characters"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="eye-toggle"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {/* Password Strength Bars */}
                                    <div className="strength-meter-container">
                                        <div className="strength-metas">
                                            <span className="strength-label">Strength:</span>
                                            <span className="strength-value" style={{ color: getStrengthColor() }}>
                                                {newPassword ? getStrengthLabel() : 'None'}
                                            </span>
                                        </div>
                                        <div className="strength-meter">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div
                                                    key={i}
                                                    className={`bar ${strengthScore >= i ? 'filled' : ''}`}
                                                    style={{ backgroundColor: strengthScore >= i ? getStrengthColor() : '#E2E8F0' }}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <div className="input-box">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Repeat your password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="eye-toggle"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" className="action-btn-dark">
                                    Reset Password <RotateCw size={16} />
                                </button>
                            </form>

                            <div className="back-link" onClick={() => navigate('/')}>
                                <ArrowLeft size={16} /> Back to Sign In
                            </div>

                            <div className="legal-footer">
                                <span>PRIVACY POLICY</span> • <span>TERMS OF SERVICE</span> • <span>HELP CENTER</span>
                            </div>
                        </>
                    )}

                </div>
            </div>

            {/* Global Footer for Step 1 */}
            {step === 1 && (
                <footer className="global-footer">
                    © 2024 Banking System Inc. All rights reserved. Secure Cloud Banking.
                </footer>
            )}
        </div>
    );
};

export default ForgotPassword;
