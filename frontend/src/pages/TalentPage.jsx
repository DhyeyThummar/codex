import { useEffect, useState } from 'react';
import api from '../services/api';

const TalentPage = () => {
  const [filters, setFilters] = useState({ skill: '', domain: '', university: '' });
  const [users, setUsers] = useState([]);

  const search = async () => {
    const query = new URLSearchParams(filters).toString();
    const { data } = await api.get(`/users?${query}`);
    setUsers(data);
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Talent Feed</h1>
      <div className="grid grid-cols-3 gap-2">
        <input className="border p-2" placeholder="skill" onChange={(e) => setFilters({ ...filters, skill: e.target.value })} />
        <input className="border p-2" placeholder="domain" onChange={(e) => setFilters({ ...filters, domain: e.target.value })} />
        <input className="border p-2" placeholder="university" onChange={(e) => setFilters({ ...filters, university: e.target.value })} />
      </div>
      <button className="border px-3 py-1" onClick={search}>Filter</button>
      <div className="grid gap-2">
        {users.map((user) => (
          <div key={user._id} className="border bg-white p-3">
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm">{user.university}</div>
            <div className="text-xs">Skills: {(user.skills || []).join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalentPage;
