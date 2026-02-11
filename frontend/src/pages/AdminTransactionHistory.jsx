import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, ArrowLeft, UserCircle } from 'lucide-react';
import './TransactionHistory.css'; // Reuse existing styles

const AdminTransactionHistory = () => {
    const navigate = useNavigate();

    return (
        <div className="th-container">
            {/* Navbar */}
            <nav className="th-nav">
                <div className="th-nav-left">
                    <div className="th-logo-box">
                        <Landmark size={20} color="black" />
                    </div>
                    <span className="th-brand-name">Bank</span>
                </div>
                <div className="th-nav-right">
                    <button className="th-back-btn" onClick={() => navigate('/admin-dashboard')}>
                        <ArrowLeft size={16} /> Back to Dashboard
                    </button>
                    <div className="profile-wrapper">
                        <UserCircle size={32} color="#9CA3AF" />
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="th-content">
                <div className="th-card">
                    <div className="th-header">
                        <h1 className="th-title">All Transactions</h1>
                        <p className="th-subtitle">View and monitor all user transactions</p>
                    </div>

                    <div className="th-table-container">
                        <table className="th-table">
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State Row */}
                                <tr className="empty-row">
                                    <td colSpan="7">No transactions found.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="th-pagination">
                        <span>Showing 0 results</span>
                        <div className="pagination-controls">
                            <button disabled>Previous</button>
                            <button disabled>Next</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminTransactionHistory;
