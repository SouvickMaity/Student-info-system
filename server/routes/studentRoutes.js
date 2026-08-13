import express from 'express';
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getDashboardStats,
} from '../controllers/studentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// All student routes require authentication
router.use(authMiddleware);

// GET /api/students/stats/dashboard — must be before /:id to avoid conflict
router.get('/stats/dashboard', getDashboardStats);

// CRUD routes
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
