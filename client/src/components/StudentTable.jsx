import React from 'react';
import { Link } from 'react-router-dom';

const StudentTable = ({ students, onDelete }) => {
  if (!students || students.length === 0) {
    return <div className="empty-state">No students found.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.department}</td>
              <td>{student.semester}</td>
              <td className="actions-cell">
                <Link to={`/students/${student._id}`} className="btn btn-sm btn-outline-primary">View</Link>
                <Link to={`/students/edit/${student._id}`} className="btn btn-sm btn-outline-warning">Edit</Link>
                <button 
                  onClick={() => onDelete(student._id)} 
                  className="btn btn-sm btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
