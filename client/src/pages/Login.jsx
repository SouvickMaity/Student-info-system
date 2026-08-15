import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await api.login(formData);

      // Store token
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Redirect to dashboard
      navigate('/dashboard');

    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: '20px',
        color: '#fff'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#111',
          border: '1px solid #2a2a2a',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Title */}
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#fff',
            fontSize: '1.8rem'
          }}
        >
          SIS Login
        </h2>

        {/* Demo Credentials */}
        <div
          style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem',
            color: '#ddd'
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '0.6rem',
              fontSize: '0.95rem'
            }}
          >
            Demo Login
          </div>

          <div
            style={{
              fontSize: '0.9rem',
              lineHeight: '1.7'
            }}
          >
            <div>
              <strong style={{ color: '#fff' }}>Email:</strong>{' '}
              admin@example.com
            </div>

            <div>
              <strong style={{ color: '#fff' }}>Password:</strong>{' '}
              password123
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              backgroundColor: '#2a0f0f',
              border: '1px solid #5c2020',
              color: '#ff6b6b',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#ddd',
                fontSize: '0.9rem'
              }}
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                boxSizing: 'border-box',
                backgroundColor: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#ddd',
                fontSize: '0.9rem'
              }}
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                boxSizing: 'border-box',
                backgroundColor: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.8rem',
              backgroundColor: loading ? '#333' : '#fff',
              color: loading ? '#aaa' : '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;

