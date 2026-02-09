import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut,
    ShieldCheck,
    FileText,
    ClipboardList
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('role');
        navigate('/');
    };

    const stats = [
        { label: 'Pending Loans', value: '', bg: '#FEF3C7', color: '#92400E' }, // Yellow
        { label: 'Total Users', value: '', bg: '#DBEAFE', color: '#1E40AF' }, // Blue
        { label: "Today's Transactions", value: '', bg: '#D1FAE5', color: '#065F46' }, // Green
        { label: 'Total Revenue', value: '', bg: '#F3E8FF', color: '#6B21A8' }, // Purple
    ];

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-left">
                    <div className="header-icon admin-icon">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="header-text">
                        <h1>Admin Dashboard</h1>
                        <p>System Administrator</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                    <LogOut size={16} /> Logout
                </button>
            </header>

            {/* Content */}
            <div className="dashboard-content">

                {/* Stats Row */}
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card">
                            <span className="stat-label">{stat.label}</span>
                            <div
                                className="stat-value-box"
                                style={{ backgroundColor: stat.bg, color: stat.color }}
                            >
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Row */}
                <div className="actions-row">
                    {/* Loan Approval Card */}
                    <div className="admin-action-card" onClick={() => navigate('/loan-approval')} style={{ cursor: 'pointer' }}>
                        <div className="admin-card-icon">
                            <FileText size={24} />
                        </div>
                        <div className="card-info">
                            <h3>Loan Approval</h3>
                            <p>Review and approve loan applications</p>
                        </div>
                    </div>

                    {/* All Transactions Card */}
                    <div className="admin-action-card" onClick={() => navigate('/admin-transactions')} style={{ cursor: 'pointer' }}>
                        <div className="admin-card-icon">
                            <ClipboardList size={24} />
                        </div>
                        <div className="card-info">
                            <h3>All Transactions</h3>
                            <p>View all user transactions</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
