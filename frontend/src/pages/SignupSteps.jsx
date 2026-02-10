import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, ArrowLeft, Info, Smartphone } from 'lucide-react';
import './SignupSteps.css';
import { registerUser } from "../services/authService";

const SignupSteps = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        phone: '',
        altPhone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [error, setError] = useState('');

    const handleNext = () => {
        if (!formData.firstName || !formData.lastName || !formData.dob || !formData.address || !formData.city || !formData.state || !formData.zip) {
            setError('Please fill in all details before proceeding.');
            return;
        }
        setError('');
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.phone) {
        setError("Please complete the data before submitting.");
        return;
    }

    try {
        setError("");

        const payload = {
            fullName: formData.firstName + " " + formData.lastName,
            email: formData.email,
            password: "Password@123",   // temporary default password
            phone: formData.phone,
            role: "CUSTOMER"
        };

        console.log("Sending to backend:", payload);

        const response = await registerUser(payload);

        console.log("Backend response:", response.data);

        alert("User Registered Successfully ✅");

        navigate("/user-dashboard");

    } catch (error) {
        console.error("Registration error:", error);

        if (error.response) {
            alert("Error: " + error.response.data);
        } else {
            alert("Backend not reachable ❌");
        }
    }
};

    return (
        <div className="wizard-container">
            {/* Top Navigation */}
            <nav className="wizard-nav">
                <div className="nav-logo">
                    <Landmark className="logo-icon" size={24} />
                    <span className="logo-text">Bank</span>
                </div>
                <div className="nav-actions">
                    <span className="login-prompt">Already have an account?</span>
                    <button onClick={() => navigate('/')} className="login-link-btn">Log in</button>
                </div>
            </nav>

            {/* Progress Stepper */}
            <div className="stepper-container">
                <div className="stepper-track">
                    <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
                        {step > 1 ? (
                            <div className="step-circle step-done">✓</div>
                        ) : (
                            <div className="step-circle">1</div>
                        )}
                        <span className="step-label">Personal Info</span>
                    </div>
                    <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
                    <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
                        <div className="step-circle">2</div>
                        <span className="step-label">Contact Details</span>
                    </div>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="wizard-card">
                {step === 1 ? (
                    /* Step 1: Personal Info */
                    <div className="wizard-step">
                        <h1 className="step-title">Let's get you started</h1>
                        <p className="step-subtitle">Please enter your details exactly as they appear on your government ID.</p>

                        <div className="form-row">
                            <div className="form-group half-width">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Jane"
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group half-width">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Doe"
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input
                                type="text"
                                id="dob"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                placeholder="DD/MM/YYYY"
                                className="form-input"
                            />
                        </div>

                        <hr className="divider" />

                        <div className="form-group">
                            <label htmlFor="address">Residential Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="123 Main Street, Apt 4B"
                                className="form-input"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group third-width">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="New York"
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group third-width">
                                <label htmlFor="state">State / Province</label>
                                <select
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="form-input"
                                >
                                    <option value="">Select State</option>

                                    {/* States */}
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>

                                    {/* Union Territories */}
                                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                    <option value="Chandigarh">Chandigarh</option>
                                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                    <option value="Ladakh">Ladakh</option>
                                    <option value="Lakshadweep">Lakshadweep</option>
                                    <option value="Puducherry">Puducherry</option>
                                </select>

                            </div>
                            <div className="form-group third-width">
                                <label htmlFor="zip">Zip</label>
                                <input
                                    type="text"
                                    id="zip"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    placeholder="10001"
                                    className="form-input"
                                />
                            </div>
                        </div>

                        {error && <p className="error-message" style={{ color: '#EF4444', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</p>}
                        <div className="wizard-actions">
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate('/user-dashboard')}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="primary-btn"
                                onClick={handleNext}
                            >
                                Continue to Step 2
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Step 2: Contact Details */
                    <div className="wizard-step">
                        <h1 className="step-title">Contact Details</h1>
                        <p className="step-subtitle">How should we get in touch with you regarding your account?</p>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="jane.doe@example.com"
                                className="form-input"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group half-width">
                                <label htmlFor="phone">Phone Number</label>
                                <div className="input-with-icon">
                                    <span className="input-icon">📞</span>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 (555) 000-0000"
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div className="form-group half-width">
                                <label htmlFor="altPhone">Alternative Phone Number <span className="optional-tag">OPTIONAL</span></label>
                                <div className="input-with-icon">
                                    <Smartphone className="input-icon-lucide" size={16} />
                                    <input
                                        type="tel"
                                        id="altPhone"
                                        name="altPhone"
                                        value={formData.altPhone}
                                        onChange={handleChange}
                                        placeholder="+1 (555) 000-0000"
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="info-box">
                            <div className="info-icon">
                                <Info size={20} />
                            </div>
                            <p>We will use these details to send you important account notifications and verification codes. Please ensure you have access to these devices.</p>
                        </div>

                        {error && <p className="error-message" style={{ color: '#EF4444', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</p>}
                        <div className="wizard-actions space-between">
                            <button
                                type="button"
                                className="back-link-btn"
                                onClick={handleBack}
                            >
                                <ArrowLeft size={16} /> Back to Personal Info
                            </button>
                            <button
                                type="button"
                                className="primary-btn"
                                onClick={handleSubmit}
                            >
                                Finish Registration
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <footer className="wizard-footer">
                <p>By continuing, you agree to our Terms of Service and Privacy Policy. Your information is encrypted and secure.</p>
                {step === 2 && <p className="footer-subtext">By finishing, you verify that the contact information provided is accurate and belongs to you. Your data privacy is our top priority.</p>}
            </footer>
        </div>
    );
};

export default SignupSteps;
