import Student from '../models/Student.js';

// GET /api/students — List all students with search & filter
export const getStudents = async (req, res) => {
  try {
    const { search, department, semester } = req.query;

    // Build query filter
    const filter = {};

    // Search by name, studentId, or email
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by department
    if (department && department !== 'All') {
      filter.department = department;
    }

    // Filter by semester
    if (semester && semester !== 'All') {
      filter.semester = Number(semester);
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Students fetched successfully',
      count: students.length,
      students,
    });
  } catch (error) {
    console.error('Get students error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch students',
    });
  }
};

// GET /api/students/stats/dashboard — Dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    // Get unique departments with student count
    const departmentStats = await Student.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    // Get unique semesters with student count
    const semesterStats = await Student.aggregate([
      { $group: { _id: '$semester', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    // Get gender distribution
    const genderStats = await Student.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      message: 'Dashboard stats fetched successfully',
      stats: {
        totalStudents,
        totalDepartments: departmentStats.length,
        departments: departmentStats,
        semesters: semesterStats,
        genders: genderStats,
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
    });
  }
};

// GET /api/students/:id — Get single student
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student fetched successfully',
      student,
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }
    console.error('Get student error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student',
    });
  }
};

// POST /api/students — Create a new student
export const createStudent = async (req, res) => {
  try {
    const { studentId, name, email, phone, gender, dateOfBirth, department, semester, address } = req.body;

    // Basic server-side validation
    if (!studentId || !name || !email || !phone || !gender || !dateOfBirth || !department || !semester) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    // Check for duplicate student ID
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'A student with this Student ID already exists',
      });
    }

    // Create student
    const student = await Student.create({
      studentId,
      name,
      email,
      phone,
      gender,
      dateOfBirth,
      department,
      semester: Number(semester),
      address: address || '',
    });

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      student,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A student with this Student ID already exists',
      });
    }

    console.error('Create student error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create student',
    });
  }
};

// PUT /api/students/:id — Update a student
export const updateStudent = async (req, res) => {
  try {
    const { studentId, name, email, phone, gender, dateOfBirth, department, semester, address } = req.body;

    // Basic server-side validation
    if (!studentId || !name || !email || !phone || !gender || !dateOfBirth || !department || !semester) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    // Check if student exists
    const existingStudent = await Student.findById(req.params.id);
    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Check for duplicate studentId (exclude current student)
    if (studentId !== existingStudent.studentId) {
      const duplicateStudent = await Student.findOne({ studentId });
      if (duplicateStudent) {
        return res.status(400).json({
          success: false,
          message: 'A student with this Student ID already exists',
        });
      }
    }

    // Update student
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { studentId, name, email, phone, gender, dateOfBirth, department, semester: Number(semester), address: address || '' },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      student,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    console.error('Update student error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update student',
    });
  }
};

// DELETE /api/students/:id — Delete a student
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }
    console.error('Delete student error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete student',
    });
  }
};
