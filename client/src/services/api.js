const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for making fetch requests
const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized / token expiration
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error.message);
    throw error;
  }
};

export const api = {
  // Auth
  login: (credentials) => fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  // Students
  getDashboardStats: () => fetchApi('/students/stats/dashboard'),
  
  getStudents: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchApi(`/students${query ? `?${query}` : ''}`);
  },
  
  getStudentById: (id) => fetchApi(`/students/${id}`),
  
  createStudent: (studentData) => fetchApi('/students', {
    method: 'POST',
    body: JSON.stringify(studentData),
  }),
  
  updateStudent: (id, studentData) => fetchApi(`/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(studentData),
  }),
  
  deleteStudent: (id) => fetchApi(`/students/${id}`, {
    method: 'DELETE',
  }),
};

export default api;
