import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    departments: 0,
    activeSemester: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getDashboardStats();
        setStats({
          totalStudents: data.stats.totalStudents,
          departments: data.stats.totalDepartments,
          activeSemester: 6, // Hardcoded or calculated depending on logic
        });
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="page-container">
      <h2>Dashboard</h2>
      <p>Welcome to the Student Information System.</p>
      
      <div className="dashboard-stats">
        {loading ? (
          <div className="loading-state">Loading stats...</div>
        ) : (
          <>
            <div className="stat-card">
              <h3>Total Students</h3>
              <div className="stat-value">{stats.totalStudents}</div>
            </div>
            <div className="stat-card">
              <h3>Departments</h3>
              <div className="stat-value">{stats.departments}</div>
            </div>
            <div className="stat-card">
              <h3>Active Semester</h3>
              <div className="stat-value">{stats.activeSemester}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
