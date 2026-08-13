import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import StudentTable from '../components/StudentTable';
import FilterPanel from '../components/FilterPanel';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [semester, setSemester] = useState('All');

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await api.getStudents({ search, department, semester });
      setStudents(data.students);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await api.deleteStudent(id);
        // Remove from UI
        setStudents(students.filter(student => student._id !== id));
      } catch (err) {
        alert(err.message || 'Failed to delete student');
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Student Management</h2>
        <Link to="/students/add" className="btn btn-primary">
          + Add Student
        </Link>
      </div>

      <div className="card">
        <FilterPanel 
          search={search}
          setSearch={setSearch}
          department={department}
          setDepartment={setDepartment}
          semester={semester}
          setSemester={setSemester}
          onFilter={fetchStudents}
        />
        
        {error && <div className="alert alert-danger" style={{marginTop: '1rem'}}>{error}</div>}
        
        {loading ? (
          <div className="loading-state" style={{marginTop: '2rem'}}>Loading students...</div>
        ) : (
          <div style={{marginTop: '1rem'}}>
            <StudentTable students={students} onDelete={handleDelete} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
