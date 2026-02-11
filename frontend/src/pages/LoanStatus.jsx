import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, ArrowLeft, UserCircle } from 'lucide-react';
import './LoanStatus.css';

const LoanStatus = () => {
    const navigate = useNavigate();

    return (
        <div className="ls-container">
            {/* Navbar */}
            <nav className="ls-nav">
                <div className="ls-nav-left">
                    <div className="ls-logo-box">
                        <Landmark size={20} color="black" />
                    </div>
                    <span className="ls-brand-name">Bank</span>
                </div>
                <div className="ls-nav-right">
                    <button className="ls-back-btn" onClick={() => navigate('/user-dashboard')}>
                        <ArrowLeft size={16} /> Back to Dashboard
                    </button>
                    <div className="ls-profile-circle">
                        <UserCircle size={32} color="#D1D5DB" fill="#F3F4F6" />
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="ls-content">
                <div className="ls-card">
                    <div className="ls-header">
                        <h1 className="ls-title">Loan Application Status</h1>
                        <p className="ls-subtitle">Track your loan applications</p>
                    </div>

                    <div className="ls-divider"></div>

                    {/* Empty State */}
                    <div className="ls-empty-state">
                        {/* Content kept empty as requested */}
                        <p style={{ color: '#9CA3AF', textAlign: 'center', padding: '40px' }}>No active loan applications found.</p>
                    </div>
                </div>
            </div>

            <footer className="ls-footer">
                © Banking System. All rights reserved.
            </footer>
        </div>
    );
};

export default LoanStatus;
