import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    requiredSkills: '',
    requiredRoles: '',
    maxMembers: 3,
    visibility: 'university',
    status: 'open'
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/projects/create', {
      ...form,
      requiredSkills: form.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean),
      requiredRoles: form.requiredRoles.split(',').map((s) => s.trim()).filter(Boolean)
    });
    navigate('/home');
  };

  return (
    <form onSubmit={submit} className="max-w-xl p-6 space-y-3">
      <h1 className="text-2xl font-bold">Create Project</h1>
      <input className="w-full border p-2" placeholder="title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea className="w-full border p-2" placeholder="description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input className="w-full border p-2" placeholder="required skills comma separated" onChange={(e) => setForm({ ...form, requiredSkills: e.target.value })} />
      <input className="w-full border p-2" placeholder="required roles comma separated" onChange={(e) => setForm({ ...form, requiredRoles: e.target.value })} />
      <input className="w-full border p-2" type="number" min="1" placeholder="max members" onChange={(e) => setForm({ ...form, maxMembers: Number(e.target.value) })} />
      <select className="w-full border p-2" onChange={(e) => setForm({ ...form, visibility: e.target.value })}>
        <option value="university">University</option>
        <option value="global">Global</option>
      </select>
      <button className="bg-accent text-white px-4 py-2">Create</button>
    </form>
  );
};

export default CreateProjectPage;
