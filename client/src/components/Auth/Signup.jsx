// src/components/Auth/Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../api';
import './AuthForm.css';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!form.username.trim()) return 'Username is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Invalid email format';
    if (form.password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) return setError(validationError);
    try {
      await signupUser(form, navigate);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <button type="submit">Create Account</button>
        </form>
        {error && <p style={{ color: '#ffb4b4' }}>{error}</p>}
      </div>
    </div>
  );
}