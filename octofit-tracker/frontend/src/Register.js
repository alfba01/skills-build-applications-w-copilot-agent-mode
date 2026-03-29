import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', team: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      // Adjust the API endpoint as needed
      const response = await axios.post('/api/users/', {
        username: form.username,
        email: form.email,
        password: form.password,
        team_id: form.team
      });
      setMessage('Registration successful!');
    } catch (error) {
      setMessage('Registration failed: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Team ID</label>
          <input type="number" className="form-control" name="team" value={form.team} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
}

export default Register;
