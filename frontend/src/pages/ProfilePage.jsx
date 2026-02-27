import { useEffect, useState } from 'react';
import api from '../services/api';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await api.get('/users/profile');
      setProfile(data);
      setForm({
        bio: data.bio || '',
        expertiseLevel: data.expertiseLevel || 'beginner',
        skills: (data.skills || []).join(', '),
        domains: (data.domains || []).join(', '),
        githubUsername: data.githubUsername || ''
      });
    };
    fetchProfile();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      domains: form.domains.split(',').map((d) => d.trim()).filter(Boolean)
    };
    const { data } = await api.put('/users/profile/update', payload);
    setProfile(data);
  };

  if (!profile) return <p className="p-6">Loading...</p>;

  return (
    <form onSubmit={save} className="max-w-xl p-6 space-y-3">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <p className="text-sm">{profile.name} ({profile.university})</p>
      <textarea className="w-full border p-2" value={form.bio} placeholder="Bio" onChange={(e) => setForm({ ...form, bio: e.target.value })} />
      <input className="w-full border p-2" value={form.expertiseLevel} placeholder="expertiseLevel" onChange={(e) => setForm({ ...form, expertiseLevel: e.target.value })} />
      <input className="w-full border p-2" value={form.skills} placeholder="skills" onChange={(e) => setForm({ ...form, skills: e.target.value })} />
      <input className="w-full border p-2" value={form.domains} placeholder="domains" onChange={(e) => setForm({ ...form, domains: e.target.value })} />
      <input className="w-full border p-2" value={form.githubUsername} placeholder="githubUsername" onChange={(e) => setForm({ ...form, githubUsername: e.target.value })} />
      <button className="bg-accent text-white px-4 py-2">Save profile</button>
    </form>
  );
};

export default ProfilePage;
