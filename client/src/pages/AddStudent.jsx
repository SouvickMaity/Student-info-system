import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import api from '../services/api';

const AddStudent = () => {
  const navigate = useNavigate();
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleAddStudent = async (studentData) => {
    try {
      setSubmitStatus({ type: 'info', message: 'Saving student...' });
      await api.createStudent(studentData);
      setSubmitStatus({ type: 'success', message: 'Student created successfully!' });
      
      // Redirect to list after a short delay
      setTimeout(() => {
        navigate('/students');
      }, 1000);
    } catch (error) {
      setSubmitStatus({ type: 'danger', message: error.message || 'Failed to create student' });
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Add New Student</h2>
        <button className="btn btn-outline" onClick={() => navigate('/students')} style={{color: 'var(--text-secondary)', borderColor: 'var(--border)'}}>
          Back
        </button>
      </div>
      
      <div className="card">
        {submitStatus && (
          <div className={`alert alert-${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}
        
        <StudentForm onSubmit={handleAddStudent} submitLabel="Add Student" />
      </div>
    </div>
  );
};

export default AddStudent;
