import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Landmark, ArrowLeft, UserCircle } from 'lucide-react';
import './AccountBalance.css';

const AccountBalance = () => {
  const navigate = useNavigate();
  const userId = 1;

  const [accounts, setAccounts] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accRes = await axios.get(`http://localhost:8080/accounts/customer/${userId}`);
        setAccounts(accRes.data);

        const totalRes = await axios.get(`http://localhost:8080/bank/customer/${userId}/total-balance`);
        setTotalBalance(totalRes.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const maskAccount = (num) => "**** " + num.toString().slice(-4);

  return (
    <div className="ab-container">
      <nav className="ab-nav">
                <div className="ab-nav-left">
                    <div className="ab-logo-box">
                        <Landmark size={20} color="black" />
                    </div>
                    <span className="ab-brand-name">Bank</span>
                </div>
                <div className="ab-nav-right">
                    <button className="ab-back-btn" onClick={() => navigate('/user-dashboard')}>
                        <ArrowLeft size={16} /> Back to Dashboard
                    </button>
                    <div className="ab-profile-circle">
                        <UserCircle size={32} color="#D1D5DB" fill="#F3F4F6" />
                    </div>
                </div>
            </nav>

      <div className="ab-content">
        <div className="ab-header">
          <h1 className="ab-title">Account Balance</h1>
          <p className="ab-subtitle">View your current account balances</p>
        </div>

        {loading ? <p>Loading...</p> : (
          <>
            <div className="ab-accounts">
              {accounts.map(acc => (
                <div key={acc.accountId} className="account-card">
                  <div className="account-left">
                    <div className="account-icon">💳</div>
                    <div className="account-info">
                      <h3>{acc.accountType} Account</h3>
                      <p>{maskAccount(acc.accountNumber)}</p>
                      <p> Last updated: {new Date(acc.createdAt).toLocaleString()}</p>

                    </div>
                  </div>

                  <div className="account-right">
                    <div className="account-balance">
                      {acc.balance.toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR'
                      })}
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <div className="total-balance-card">
              <span>Total Balance</span>
              <span>
                {totalBalance.toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR'
                })}
              </span>
            </div>
          </>
        )}
      </div>

      <footer className="ab-footer">
        © Banking System. All rights reserved.
      </footer>
    </div>
  );
};

export default AccountBalance;
