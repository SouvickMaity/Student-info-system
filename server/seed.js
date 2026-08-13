import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Student from './models/Student.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Student.deleteMany({});
    console.log('Cleared existing data.');

    // Create demo user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
    });
    console.log(`Created demo user: ${user.email}`);

    // Create demo students
    const students = [
      {
        studentId: 'STU001',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@college.edu',
        phone: '9876543210',
        gender: 'Male',
        dateOfBirth: new Date('2003-03-15'),
        department: 'CSE',
        semester: 5,
        address: '12 MG Road, Kolkata, West Bengal',
      },
      {
        studentId: 'STU002',
        name: 'Priya Patel',
        email: 'priya.patel@college.edu',
        phone: '9876543211',
        gender: 'Female',
        dateOfBirth: new Date('2003-07-22'),
        department: 'ECE',
        semester: 3,
        address: '45 Park Street, Mumbai, Maharashtra',
      },
      {
        studentId: 'STU003',
        name: 'Rohit Kumar',
        email: 'rohit.kumar@college.edu',
        phone: '9876543212',
        gender: 'Male',
        dateOfBirth: new Date('2002-11-08'),
        department: 'IT',
        semester: 7,
        address: '78 Sector 14, Gurugram, Haryana',
      },
      {
        studentId: 'STU004',
        name: 'Sneha Das',
        email: 'sneha.das@college.edu',
        phone: '9876543213',
        gender: 'Female',
        dateOfBirth: new Date('2004-01-30'),
        department: 'CSE',
        semester: 1,
        address: '23 Salt Lake, Kolkata, West Bengal',
      },
      {
        studentId: 'STU005',
        name: 'Arjun Singh',
        email: 'arjun.singh@college.edu',
        phone: '9876543214',
        gender: 'Male',
        dateOfBirth: new Date('2003-05-12'),
        department: 'Mechanical',
        semester: 5,
        address: '56 Connaught Place, New Delhi',
      },
      {
        studentId: 'STU006',
        name: 'Ananya Gupta',
        email: 'ananya.gupta@college.edu',
        phone: '9876543215',
        gender: 'Female',
        dateOfBirth: new Date('2003-09-18'),
        department: 'Civil',
        semester: 3,
        address: '90 Anna Nagar, Chennai, Tamil Nadu',
      },
      {
        studentId: 'STU007',
        name: 'Vikram Reddy',
        email: 'vikram.reddy@college.edu',
        phone: '9876543216',
        gender: 'Male',
        dateOfBirth: new Date('2002-12-05'),
        department: 'ECE',
        semester: 7,
        address: '34 Banjara Hills, Hyderabad, Telangana',
      },
      {
        studentId: 'STU008',
        name: 'Ishita Banerjee',
        email: 'ishita.banerjee@college.edu',
        phone: '9876543217',
        gender: 'Female',
        dateOfBirth: new Date('2004-02-14'),
        department: 'IT',
        semester: 1,
        address: '67 Gariahat, Kolkata, West Bengal',
      },
      {
        studentId: 'STU009',
        name: 'Karan Mehta',
        email: 'karan.mehta@college.edu',
        phone: '9876543218',
        gender: 'Male',
        dateOfBirth: new Date('2003-06-25'),
        department: 'CSE',
        semester: 5,
        address: '12 Shivaji Nagar, Pune, Maharashtra',
      },
      {
        studentId: 'STU010',
        name: 'Diya Nair',
        email: 'diya.nair@college.edu',
        phone: '9876543219',
        gender: 'Female',
        dateOfBirth: new Date('2003-08-10'),
        department: 'Mechanical',
        semester: 3,
        address: '45 MG Road, Bangalore, Karnataka',
      },
    ];

    await Student.insertMany(students);
    console.log(`Created ${students.length} demo students.`);

    console.log('\n✅ Seed completed successfully!');
    console.log('\n📌 Demo Login Credentials:');
    console.log('   Email: admin@example.com');
    console.log('   Password: password123\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
