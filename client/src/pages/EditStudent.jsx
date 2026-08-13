import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import api from '../services/api';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const data = await api.getStudentById(id);
        setInitialData(data.student);
      } catch (err) {
        setError(err.message || 'Failed to fetch student details');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleUpdateStudent = async (studentData) => {
    try {
      setSubmitStatus({ type: 'info', message: 'Updating student...' });
      await api.updateStudent(id, studentData);
      setSubmitStatus({ type: 'success', message: 'Student updated successfully!' });
      
      setTimeout(() => {
        navigate('/students');
      }, 1000);
    } catch (error) {
      setSubmitStatus({ type: 'danger', message: error.message || 'Failed to update student' });
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Edit Student</h2>
        <button className="btn btn-outline" onClick={() => navigate('/students')} style={{color: 'var(--text-secondary)', borderColor: 'var(--border)'}}>
          Back
        </button>
      </div>
      
      <div className="card">
        {error && <div className="alert alert-danger">{error}</div>}
        
        {submitStatus && (
          <div className={`alert alert-${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}
        
        {loading ? (
          <div className="loading-state">Loading student data...</div>
        ) : (
          initialData && <StudentForm initialData={initialData} onSubmit={handleUpdateStudent} submitLabel="Update Student" />
        )}
      </div>
    </div>
  );
};

export default EditStudent;
