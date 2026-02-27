import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', university: '', githubUsername: '', skills: '', domains: '' });

  const submit = async (e) => {
    e.preventDefault();
    await register({
      ...form,
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      domains: form.domains.split(',').map((d) => d.trim()).filter(Boolean)
    });
    navigate('/home');
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 space-y-3">
      <h1 className="text-2xl font-bold">Register</h1>
      {['name', 'email', 'password', 'university', 'githubUsername', 'skills', 'domains'].map((field) => (
        <input
          key={field}
          className="w-full border p-2"
          type={field === 'password' ? 'password' : 'text'}
          placeholder={field}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        />
      ))}
      <button className="bg-accent text-white px-4 py-2">Register</button>
      <p>Have account? <Link className="text-accent" to="/login">Login</Link></p>
    </form>
  );
};

export default RegisterPage;
