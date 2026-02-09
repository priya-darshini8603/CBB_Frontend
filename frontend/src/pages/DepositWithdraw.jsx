import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Landmark,
    UserCircle,
    ArrowRight,
    ArrowLeft,
    ChevronDown,
    Check,
    Lock
} from 'lucide-react';
import './DepositWithdraw.css';

const DepositWithdraw = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        type: 'Deposit',
        accountNumber: '',
        amount: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [error, setError] = useState('');

    const handleNext = () => {
        if (formData.accountNumber && formData.amount) {
            setStep(2);
            setError('');
        } else {
            setError('Please fill in all required fields.');
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleConfirm = () => {
        // Simulate API call
        console.log('Transaction Confirmed:', formData);
        navigate('/user-dashboard');
    };

    return (
        <div className="dw-container">
            {/* Top Navigation */}
            <nav className="dw-nav">
                <div className="dw-nav-left">
                    <div className="dw-logo-box">
                        <Landmark size={20} color="white" />
                    </div>
                    <span className="dw-brand-name">Bank</span>
                </div>

                <div className="dw-nav-right">
                    <button className="dw-back-btn" onClick={() => navigate('/user-dashboard')}>
                        <ArrowLeft size={16} /> Back to Dashboard
                    </button>
                    <div className="profile-circle">
                        <UserCircle size={32} color="#D1D5DB" fill="#F3F4F6" />
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="dw-content">

                {/* Step 1: Transaction Details */}
                {step === 1 && (
                    <div className="dw-card">
                        <h1 className="dw-title">Deposit / Transfer</h1>
                        <p className="dw-subtitle">Step 1 of 2</p>

                        <div className="progress-bar-container">
                            <div className="progress-bar filled" style={{ width: '50%' }}></div>
                        </div>

                        <h2 className="section-title">Transaction Details</h2>

                        <div className="form-group">
                            <label>Transaction Type</label>
                            <div className="select-wrapper">
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="dw-select"
                                >
                                    <option value="Deposit">Deposit</option>
                                    <option value="Transfer">Transfer</option>
                                </select>
                                {/* <ChevronDown className="select-icon" size={16} /> */}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Account Number</label>
                            <input
                                type="text"
                                name="accountNumber"
                                placeholder="Enter account number"
                                value={formData.accountNumber}
                                onChange={handleChange}
                                className="dw-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Amount</label>
                            <input
                                type="number"
                                name="amount"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={handleChange}
                                className="dw-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description (Optional)</label>
                            <input
                                type="text"
                                name="description"
                                placeholder="Enter transaction description"
                                value={formData.description}
                                onChange={handleChange}
                                className="dw-input"
                            />
                        </div>

                        {error && <p className="error-message" style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
                        <div className="dw-actions">
                            <button className="dw-btn-outline" onClick={() => navigate('/user-dashboard')}>
                                <ArrowLeft size={16} /> Cancel
                            </button>
                            <button className="dw-btn-primary" onClick={handleNext}>
                                Next <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Confirm */}
                {step === 2 && (
                    <div className="dw-card">
                        <h1 className="dw-title center-text">Deposit / Transfer</h1>
                        <p className="dw-subtitle center-text">Step 2 of 2</p>

                        <div className="progress-bar-container">
                            <div className="progress-bar filled" style={{ width: '100%' }}></div>
                        </div>

                        <div className="confirm-icon-wrapper">
                            <div className="confirm-circle">
                                <Check size={32} color="#10B981" strokeWidth={4} />
                            </div>
                        </div>

                        <h2 className="section-title center-text">Confirm Transaction</h2>

                        <div className="summary-box">
                            <div className="summary-row">
                                <span className="label">Transaction Type:</span>
                                <span className="value bold">{formData.type}</span>
                            </div>
                            <div className="summary-row">
                                <span className="label">Account Number:</span>
                                <span className="value bold">**** {formData.accountNumber.slice(-4) || '0000'}</span>
                            </div>
                            <div className="summary-row">
                                <span className="label">Amount:</span>
                                <span className="value bold large">${parseFloat(formData.amount || 0).toFixed(2)}</span>
                            </div>
                        </div>

                        <p className="confirm-note">Please review the details carefully before confirming.</p>

                        <div className="dw-actions">
                            <button className="dw-btn-outline" onClick={handleBack}>
                                <ArrowLeft size={16} /> Back
                            </button>
                            <button className="dw-btn-primary" onClick={handleConfirm}>
                                Confirm
                            </button>
                        </div>
                    </div>
                )}

                {/* <div className="dw-footer">
                    <Lock size={12} /> Your transaction is encrypted and secure.
                </div> */}
            </div>
        </div>
    );
};

export default DepositWithdraw;
