import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import "./AdminAnalytics.css";

const COLORS = ["#16a34a", "#f59e0b", "#dc2626"]; // Green, Orange, Red

const AdminAnalytics = () => {
  const navigate = useNavigate();

  // ===== SAMPLE DATA =====
  const [loanStats] = useState([
    { name: "Approved", value: 3 },
    { name: "Pending", value: 3 },
    { name: "Rejected", value: 1 }
  ]);

  const [txnStats] = useState([
    { day: "Day 1", transactions: 8 },
    { day: "Day 2", transactions: 5 }
  ]);

  const totalLoans = loanStats.reduce((a, b) => a + b.value, 0);

  return (
    <div className="analytics-container">

      <div className="analytics-header">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h1>Admin Analytics Dashboard</h1>
      </div>

      <div className="charts-grid">

        {/* ===== DONUT CHART ===== */}
        <div className="chart-card">
          <h2>Loan Status Distribution</h2>

          <ResponsiveContainer width="100%" height={420}>
            <PieChart>
              <Pie
                data={loanStats}
                cx="50%"
                cy="50%"
                innerRadius={95}
                outerRadius={140}
                paddingAngle={4}
                dataKey="value"
                label
              >
                {loanStats.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend verticalAlign="bottom" height={40} />

              <text x="50%" y="48%" textAnchor="middle" className="center-number">
                {totalLoans}
              </text>
              <text x="50%" y="58%" textAnchor="middle" className="center-label">
                Total Loans
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ===== BAR CHART (BLUE) ===== */}
        <div className="chart-card">
          <h2>Monthly Transactions</h2>

          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={txnStats}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="day"
                label={{ value: "Day of Month", position: "insideBottom", offset: -5 }}
              />

              <YAxis
                label={{ value: "Transactions", angle: -90, position: "insideLeft" }}
              />

              <Tooltip />

              {/* BLUE BARS */}
              <Bar
                dataKey="transactions"
                radius={[8, 8, 0, 0]}
                fill="#3B82F6"         // Main Blue
                stroke="#1D4ED8"       // Dark Blue Border
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;