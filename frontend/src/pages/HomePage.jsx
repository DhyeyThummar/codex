import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const HomePage = () => {
  const [space, setSpace] = useState('university');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await api.get(`/projects?space=${space}`);
      setProjects(data);
    };
    fetchProjects();
  }, [space]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Feed</h1>
      <div className="flex gap-2 mb-4">
        <button className="border px-3 py-1" onClick={() => setSpace('university')}>University</button>
        <button className="border px-3 py-1" onClick={() => setSpace('global')}>Global</button>
      </div>
      <div className="grid gap-3">
        {projects.map((project) => (
          <Link key={project._id} to={`/project/${project._id}`} className="border p-3 bg-white">
            <div className="font-semibold">{project.title}</div>
            <div className="text-sm">{project.description}</div>
            <div className="text-xs">{project.visibility} | {project.status}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
