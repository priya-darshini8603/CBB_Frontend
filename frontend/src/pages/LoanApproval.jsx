import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Landmark, UserCircle } from 'lucide-react';
import './LoanApproval.css';

const LoanApproval = () => {
    const navigate = useNavigate();

    return (
        <div className="la-container">
            {/* Header/Nav */}
            <nav className="la-nav">
                <div className="la-nav-left">
                    <div className="la-logo-box">
                        <Landmark size={20} color="black" />
                    </div>
                    <span className="la-brand-name">Bank</span>
                </div>
                <div className="la-nav-right">
                    <button className="la-back-btn" onClick={() => navigate('/admin-dashboard')}>
                        <ArrowLeft size={16} /> Back to Dashboard
                    </button>
                    <div className="la-profile-circle">
                        <UserCircle size={32} color="#D1D5DB" fill="#F3F4F6" />
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="la-content">
                <div className="la-card">
                    <div className="la-page-header">
                        <h1 className="la-title">Loan Approval Management</h1>
                        <p className="la-subtitle">Review and process loan applications</p>
                    </div>

                    <div className="la-divider"></div>

                    {/* Empty State */}
                    <div className="la-empty-state">
                        <p>No pending loan applications.</p>
                    </div>
                </div>

                {/* Pagination Placeholder (Hidden for empty state usually, but can show inactive) */}
                {/* 
                <div className="la-pagination">
                   ...
                </div> 
                */}
            </div>
        </div>
    );
};

export default LoanApproval;
