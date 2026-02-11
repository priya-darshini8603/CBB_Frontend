import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Landmark,
    UserCircle,
    ArrowRight,
    ArrowLeft,
} from 'lucide-react';
import './DepositWithdraw.css';

const DepositWithdraw = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        type: 'Deposit',
        accountNumber: '',
        fromAccount: '',
        toAccount: '',
        amount: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        const { type, accountNumber, fromAccount, toAccount, amount } = formData;

        if (!amount || Number(amount) <= 0)
            return setError("Enter a valid amount.");

        if ((type === "Deposit" || type === "Withdraw") && !accountNumber)
            return setError("Account number is required.");

        if (type === "Transfer") {
            if (!fromAccount || !toAccount)
                return setError("Both From and To accounts are required.");
            if (fromAccount === toAccount)
                return setError("Cannot transfer to the same account.");
        }

        setError('');
        setStep(2);
    };

    const handleBack = () => setStep(1);

    const handleConfirm = async () => {
     try {
        let response;

        if (formData.type === "Deposit") {
            response = await axios.post("http://localhost:8080/bank/deposit", {
                accountNumber:Number(formData.accountNumber),
                amount: Number(formData.amount),
                description: formData.description
            });
        }

        else if (formData.type === "Withdraw") {
            response = await axios.post("http://localhost:8080/bank/withdraw", {
                accountNumber:Number(formData.accountNumber),
                amount: Number(formData.amount),
                description: formData.description
            });
        }

        else if (formData.type === "Transfer") {
            response = await axios.post("http://localhost:8080/bank/transfer", {
            fromAccountNumber: Number(formData.fromAccount),
            toAccountNumber: Number(formData.toAccount),
            amount: Number(formData.amount),
            description: formData.description
        });
    }

        alert(response.data.message || "Transaction Successful!");
        navigate('/user-dashboard');

     } catch (err) {
        console.error("ERROR:", err);
        let message = "Transaction failed";
        if (err.response) {
        message = err.response.data?.message || "Server error";
    } 
    else if (err.request) {
        message = "Server not responding";
    } 
    else {

        message = err.message;
    }

    alert("❌ " + message);
   }

    };


    return (
        <div className="dw-container">
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

            <div className="dw-content">

                {/* STEP 1 */}
                {step === 1 && (
                    <div className="dw-card">
                        <h1 className="dw-title">Transaction</h1>
                        <p className="dw-subtitle">Step 1 of 2</p>

                        <div className="progress-bar-container">
                            <div className="progress-bar filled" style={{ width: '50%' }}></div>
                        </div>

                        {/* Transaction Type */}
                        <div className="form-group">
                            <label>Transaction Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="dw-select"
                            >
                                <option value="Deposit">Deposit</option>
                                <option value="Withdraw">Withdraw</option>
                                <option value="Transfer">Transfer</option>
                            </select>
                        </div>

                        {/* Single Account for Deposit & Withdraw */}
                        {(formData.type === 'Deposit' || formData.type === 'Withdraw') && (
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
                        )}

                        {/* Transfer Fields */}
                        {formData.type === 'Transfer' && (
                            <>
                                <div className="form-group">
                                    <label>From Account</label>
                                    <input
                                        type="text"
                                        name="fromAccount"
                                        placeholder="Sender account"
                                        value={formData.fromAccount}
                                        onChange={handleChange}
                                        className="dw-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>To Account</label>
                                    <input
                                        type="text"
                                        name="toAccount"
                                        placeholder="Receiver account"
                                        value={formData.toAccount}
                                        onChange={handleChange}
                                        className="dw-input"
                                    />
                                </div>
                            </>
                        )}

                        {/* Amount */}
                        <div className="form-group">
                            <label>Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="dw-input"
                            />
                        </div>

                        {/* Description */}
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="dw-input"
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

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

                {/* STEP 2 CONFIRM */}
                {step === 2 && (
                    <div className="dw-card">
                        <h1 className="dw-title center-text">Confirm Transaction</h1>

                        <div className="summary-box">
                            <div className="summary-row">
                                <span>Type:</span>
                                <span className="bold">{formData.type}</span>
                            </div>

                            {(formData.type === "Deposit" || formData.type === "Withdraw") && (
                                <div className="summary-row">
                                    <span>Account:</span>
                                    <span className="bold">**** {formData.accountNumber.slice(-4)}</span>
                                </div>
                            )}

                            {formData.type === "Transfer" && (
                                <>
                                    <div className="summary-row">
                                        <span>From:</span>
                                        <span className="bold">**** {formData.fromAccount.slice(-4)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>To:</span>
                                        <span className="bold">**** {formData.toAccount.slice(-4)}</span>
                                    </div>
                                </>
                            )}

                            <div className="summary-row">
                                <span>Amount:</span>
                                <span className="bold">₹{parseFloat(formData.amount).toFixed(2)}</span>
                            </div>
                        </div>

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
            </div>
        </div>
    );
};

export default DepositWithdraw;
