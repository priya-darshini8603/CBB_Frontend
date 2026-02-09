import React, { useEffect, useState } from 'react';
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

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userRole = localStorage.getItem('role');

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    // Redirect to correct dashboard if role doesn't match
    return <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard'} replace />;
  }

  return children;
};

// Public Route (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userRole = localStorage.getItem('role');

  if (isAuthenticated) {
    return <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard'} replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute allowedRole="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
