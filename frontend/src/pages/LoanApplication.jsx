import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, ArrowLeft, ArrowRight, ChevronDown, Bell, UserCircle } from 'lucide-react';
import './LoanApplication.css';

const LoanApplication = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        loanType: 'Personal Loan',
        amount: '',
        purpose: '',
        tenure: '12 months',
        employmentStatus: 'Full-time Employed',
        employerName: '',
        monthlyIncome: '',
        creditScore: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (!formData.amount || !formData.purpose) {
            setError('Please fill in all details before proceeding.');
            return;
        }
        setError('');
        setStep(2);
    };

    const handleBack = () => setStep(1);
const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.employerName || !formData.monthlyIncome || !formData.creditScore) {
        setError('Please fill in all details before submitting.');
        return;
    }

    if (formData.creditScore < 300 || formData.creditScore > 900) {
        setError('Credit score must be between 300 and 900.');
        return;
    }

    try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Session expired. Login again.");

        const loanTypeMap = {
            "Personal Loan": "PERSONAL",
            "Home Loan": "HOME",
            "Auto Loan": "AUTO"
        };

        const selectedLoanType = loanTypeMap[formData.loanType];
        if (!selectedLoanType) throw new Error("Invalid loan type selected.");

        const payload = {
            loanType: selectedLoanType,
            loanAmount: Number(formData.amount),
            tenureMonths: Number(formData.tenure.split(" ")[0]),
            salary: Number(formData.monthlyIncome),
            creditScore: Number(formData.creditScore)
        };

        if (!payload.loanAmount || !payload.salary || !payload.tenureMonths) {
            throw new Error("Invalid numeric values.");
        }

        const res = await fetch("http://localhost:8080/api/loans/apply", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Loan application failed");
        }

        const data = await res.json();
        console.log("Loan Created:", data);

        alert("Loan application submitted successfully! Await admin approval.");

        navigate('/user-dashboard');

    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="loan-container">
            <nav className="loan-nav">
                <div className="nav-left">
                    <div className="logo-box">
                        <Landmark size={20} color="black" />
                    </div>
                    <span className="brand-name">Bank</span>
                </div>
                <div className="nav-right">
                    <button className="loan-back-btn" onClick={() => navigate('/user-dashboard')}>
                        <ArrowLeft size={16} /> Back to Dashboard
                    </button>
                    <div className="profile-wrapper">
                        <UserCircle size={32} color="#9CA3AF" />
                    </div>
                </div>
            </nav>

            <div className="loan-content">
                <div className="loan-card">
                    <h1 className="loan-title">Loan Application</h1>
                    <p className="loan-subtitle">Step {step} of 2</p>

                    <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: step === 1 ? '50%' : '100%' }}></div>
                    </div>

                    {step === 1 ? (
                        <div className="step-content">
                            <h2 className="section-header">Loan Details</h2>

                            <div className="form-group">
                                <label>Loan Type</label>
                                <div className="select-container">
                                    <select name="loanType" value={formData.loanType} onChange={handleChange} className="form-select">
                                        <option value="Personal Loan">Personal Loan</option>
                                        <option value="Home Loan">Home Loan</option>
                                        <option value="Auto Loan">Auto Loan</option>
                                    </select>
                                    <ChevronDown className="select-arrow" size={16} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Loan Amount</label>
                                <input type="number" name="amount" placeholder="Enter loan amount" value={formData.amount} onChange={handleChange} className="form-input" />
                            </div>

                            <div className="form-group">
                                <label>Purpose of Loan</label>
                                <input type="text" name="purpose" placeholder="Enter loan purpose" value={formData.purpose} onChange={handleChange} className="form-input" />
                            </div>

                            <div className="form-group">
                                <label>Loan Tenure (Months)</label>
                                <div className="select-container">
                                    <select name="tenure" value={formData.tenure} onChange={handleChange} className="form-select">
                                        <option value="12 months">12 months</option>
                                        <option value="24 months">24 months</option>
                                        <option value="36 months">36 months</option>
                                        <option value="48 months">48 months</option>
                                        <option value="60 months">60 months</option>
                                    </select>
                                    <ChevronDown className="select-arrow" size={16} />
                                </div>
                            </div>

                            {error && <p className="error-message" style={{ color: '#EF4444', marginBottom: '16px', fontSize: '14px' }}>{error}</p>}

                            <div className="form-actions">
                                <button className="btn-cancel" onClick={() => navigate('/user-dashboard')}>
                                    <ArrowLeft size={16} /> Cancel
                                </button>
                                <button className="btn-next" onClick={handleNext}>
                                    Next <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="step-content">
                            <h2 className="section-header">Employment & Confirmation</h2>

                            <div className="form-group">
                                <label>Employment Status</label>
                                <div className="select-container">
                                    <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} className="form-select">
                                        <option value="Full-time Employed">Full-time Employed</option>
                                        <option value="Part-time Employed">Part-time Employed</option>
                                        <option value="Self-Employed">Self-Employed</option>
                                        <option value="Unemployed">Unemployed</option>
                                    </select>
                                    <ChevronDown className="select-arrow" size={16} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Employer Name</label>
                                <input type="text" name="employerName" placeholder="Enter employer name" value={formData.employerName} onChange={handleChange} className="form-input" />
                            </div>

                            <div className="form-group">
                                <label>Monthly Income</label>
                                <input type="number" name="monthlyIncome" placeholder="Enter monthly income" value={formData.monthlyIncome} onChange={handleChange} className="form-input" />
                            </div>

                            <div className="form-group">
                                <label>Credit Score</label>
                                <input type="number" name="creditScore" placeholder="Enter credit score (300-900)" value={formData.creditScore} onChange={handleChange} className="form-input" />
                            </div>


                            {error && <p className="error-message" style={{ color: '#EF4444', marginBottom: '16px', fontSize: '14px' }}>{error}</p>}

                            <div className="form-actions">
                                <button className="btn-cancel" onClick={handleBack}>
                                    <ArrowLeft size={16} /> Back
                                </button>
                                <button className="btn-next" onClick={handleSubmit} disabled={loading}>
                                    {loading ? "Submitting..." : "Submit Application"} <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoanApplication;
