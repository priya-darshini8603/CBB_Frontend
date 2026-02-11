import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SignupWizard from './pages/SignupWizard';
import SignupSteps from './pages/SignupSteps';
import ForgotPassword from './pages/ForgotPassword';
import DepositWithdraw from './pages/DepositWithdraw';
import LoanApplication from './pages/LoanApplication';
import LoanStatus from './pages/LoanStatus';
import TransactionHistory from './pages/TransactionHistory';
import AccountBalance from './pages/AccountBalance';
import LoanApproval from './pages/LoanApproval';
import AdminTransactionHistory from './pages/AdminTransactionHistory';


// ================= PROTECTED ROUTE =================
const ProtectedRoute = ({ children, allowedRole }) => {
  const isAuth = localStorage.getItem('isAuthenticated');
  const role = localStorage.getItem('role');

  if (!isAuth) return <Navigate to="/" replace />;

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} replace />;
  }

  return children;
};


// ================= PUBLIC ROUTE =================
const PublicRoute = ({ children }) => {
  const isAuth = localStorage.getItem('isAuthenticated');

  // ⚠️ IMPORTANT: Do NOT redirect automatically (prevents loop)
  if (isAuth === 'true') {
    return children;
  }

  return children;
};


function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* USER DASHBOARD */}
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute allowedRole="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/signup" element={<SignupWizard />} />
      <Route path="/create-account" element={<SignupSteps />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/deposit-withdraw" element={<DepositWithdraw />} />
      <Route path="/loan-application" element={<LoanApplication />} />
      <Route path="/loan-status" element={<LoanStatus />} />
      <Route path="/transaction-history" element={<TransactionHistory />} />
      <Route path="/account-balance" element={<AccountBalance />} />
      <Route path="/loan-approval" element={<LoanApproval />} />
      <Route path="/admin-transactions" element={<AdminTransactionHistory />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;