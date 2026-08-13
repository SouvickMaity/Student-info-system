import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import StudentDetails from './pages/StudentDetails';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/students" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Students />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/students/add" element={
          <ProtectedRoute>
            <DashboardLayout>
              <AddStudent />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/students/edit/:id" element={
          <ProtectedRoute>
            <DashboardLayout>
              <EditStudent />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/students/:id" element={
          <ProtectedRoute>
            <DashboardLayout>
              <StudentDetails />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
