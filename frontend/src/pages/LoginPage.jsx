import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    await login(form);
    navigate('/home');
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 space-y-3">
      <h1 className="text-2xl font-bold">Login</h1>
      <input className="w-full border p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full border p-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="bg-accent text-white px-4 py-2">Login</button>
      <p>Need account? <Link className="text-accent" to="/register">Register</Link></p>
    </form>
  );
};

export default LoginPage;
