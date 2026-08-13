import React, { useState, useEffect } from 'react';

const StudentForm = ({ initialData, onSubmit, submitLabel = "Save" }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    department: '',
    semester: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      // Format date for the input field if it exists (YYYY-MM-DD)
      const formattedData = { ...initialData };
      if (formattedData.dateOfBirth) {
        formattedData.dateOfBirth = formattedData.dateOfBirth.split('T')[0];
      }
      setFormData(formattedData);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    
    // Phone validation (10 digits)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must contain exactly 10 digits';
    }

    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.department) newErrors.department = 'Department is required';
    
    if (!formData.semester) {
      newErrors.semester = 'Semester is required';
    } else if (isNaN(formData.semester) || formData.semester < 1 || formData.semester > 8) {
      newErrors.semester = 'Semester must be between 1 and 8';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-group">
          <label>Student ID *</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="e.g. STU123"
            className={errors.studentId ? 'input-error' : ''}
          />
          {errors.studentId && <span className="error-message">{errors.studentId}</span>}
        </div>

        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="student@example.com"
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10 digit number"
            className={errors.phone ? 'input-error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Gender *</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange}
            className={errors.gender ? 'input-error' : ''}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>

        <div className="form-group">
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={errors.dateOfBirth ? 'input-error' : ''}
          />
          {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
        </div>

        <div className="form-group">
          <label>Department *</label>
          <select 
            name="department" 
            value={formData.department} 
            onChange={handleChange}
            className={errors.department ? 'input-error' : ''}
          >
            <option value="">Select Department</option>
            <option value="CSE">Computer Science (CSE)</option>
            <option value="ECE">Electronics (ECE)</option>
            <option value="IT">Information Tech (IT)</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
          </select>
          {errors.department && <span className="error-message">{errors.department}</span>}
        </div>

        <div className="form-group">
          <label>Semester (1-8) *</label>
          <input
            type="number"
            name="semester"
            min="1"
            max="8"
            value={formData.semester}
            onChange={handleChange}
            className={errors.semester ? 'input-error' : ''}
          />
          {errors.semester && <span className="error-message">{errors.semester}</span>}
        </div>
      </div>

      <div className="form-group full-width">
        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          placeholder="Enter full address"
        ></textarea>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">{submitLabel}</button>
      </div>
    </form>
  );
};

export default StudentForm;
