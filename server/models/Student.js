import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: ['CSE', 'ECE', 'IT', 'Mechanical', 'Civil'],
  },
  semester: {
    type: Number,
    required: [true, 'Semester is required'],
    min: [1, 'Semester must be between 1 and 8'],
    max: [8, 'Semester must be between 1 and 8'],
  },
  address: {
    type: String,
    trim: true,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
