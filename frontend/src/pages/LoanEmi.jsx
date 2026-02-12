import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Landmark, ArrowLeft, UserCircle } from "lucide-react";
import "./TransactionHistory.css";

const LoanEmi = () => {
    const navigate = useNavigate();
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    window.location.href = "/";
                    return;
                }

                const res = await fetch("http://localhost:8080/api/loans/customer", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error("Failed to load loans");

                const data = await res.json();
                setLoans(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    return (
        <div className="th-container">
            {/* NAVBAR */}
            <nav className="th-nav">
                <div className="th-nav-left">
                    <div className="th-logo-box">
                        <Landmark size={20} color="black" />
                    </div>
                    <span className="th-brand-name">Bank</span>
                </div>

                <div className="th-nav-right">
                    <button
                        className="th-back-btn"
                        onClick={() => navigate("/user-dashboard")}
                    >
                        <ArrowLeft size={16} /> Back to Dashboard
                    </button>
                    <div className="profile-wrapper">
                        <UserCircle size={32} color="#9CA3AF" />
                    </div>
                </div>
            </nav>

            {/* CONTENT */}
            <div className="th-content">
                <div className="th-card">

                    <div className="th-header">
                        <h1 className="th-title">My Loan EMIs</h1>
                        <p className="th-subtitle">View EMI details for your loans</p>
                    </div>

                    <div className="th-table-container">
                        <table className="th-table">
                            <thead>
                                <tr>
                                    <th>Loan ID</th>
                                    <th>Principal</th>
                                    <th>Interest %</th>
                                    <th>Tenure (Months)</th>
                                    <th>EMI Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6">Loading...</td>
                                    </tr>
                                ) : error ? (
                                    <tr className="empty-row">
                                        <td colSpan="6">{error}</td>
                                    </tr>
                                ) : loans.length === 0 ? (
                                    <tr className="empty-row">
                                        <td colSpan="6">No loan records found.</td>
                                    </tr>
                                ) : (
                                    loans.map((loan) => (
                                        <tr key={loan.loanId}>
                                            <td>{loan.loanId}</td>
                                            <td>
                                                {Number(loan.loanAmount).toLocaleString("en-IN", {
                                                    style: "currency",
                                                    currency: "INR"
                                                })}
                                            </td>
                                            <td>{loan.annualInterestRate}%</td>
                                            <td>{loan.tenureMonths}</td>
                                            <td>
                                                {Number(loan.emi).toLocaleString("en-IN", {
                                                    style: "currency",
                                                    currency: "INR"
                                                })}
                                            </td>
                                            <td className={`status ${loan.status.toLowerCase()}`}>
                                                {loan.status}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="th-pagination">
                        <span>Showing {loans.length} results</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanEmi;
