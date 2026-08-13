import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const data = await api.getStudentById(id);
        setStudent(data.student);
      } catch (err) {
        setError(err.message || 'Failed to fetch student details');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await api.deleteStudent(id);
        navigate('/students');
      } catch (err) {
        alert(err.message || 'Failed to delete student');
      }
    }
  };

  if (loading) return <div className="page-container"><div className="loading-state">Loading student details...</div></div>;
  if (error) return <div className="page-container"><div className="alert alert-danger">{error}</div></div>;
  if (!student) return <div className="page-container"><div className="alert alert-info">Student not found.</div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Student Details</h2>
        <div className="header-actions">
          <Link to={`/students/edit/${student._id}`} className="btn btn-primary" style={{marginRight: '0.5rem'}}>
            Edit
          </Link>
          <button className="btn btn-outline" onClick={() => navigate('/students')} style={{color: 'var(--text-secondary)', borderColor: 'var(--border)'}}>
            Back
          </button>
        </div>
      </div>
      
      <div className="card details-card">
        <div className="details-header">
          <div className="avatar">{student.name.charAt(0).toUpperCase()}</div>
          <div className="header-info">
            <h3>{student.name}</h3>
            <span className="badge">{student.studentId}</span>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Email</span>
            <span className="detail-value">{student.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Phone</span>
            <span className="detail-value">{student.phone}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Department</span>
            <span className="detail-value">{student.department}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Semester</span>
            <span className="detail-value">{student.semester}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Gender</span>
            <span className="detail-value">{student.gender}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Date of Birth</span>
            <span className="detail-value">{new Date(student.dateOfBirth).toLocaleDateString()}</span>
          </div>
        </div>

        {student.address && (
          <div className="detail-item full-width mt-4">
            <span className="detail-label">Address</span>
            <span className="detail-value">{student.address}</span>
          </div>
        )}

        <div className="details-actions mt-4">
          <button onClick={handleDelete} className="btn" style={{backgroundColor: 'white', border: '1px solid var(--danger)', color: 'var(--danger)'}}>
            Delete Student Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
