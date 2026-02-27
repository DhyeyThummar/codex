import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await api.get(`/projects/${id}`);
      setProject(data);
    };
    fetchProject();
  }, [id]);

  const apply = async () => {
    await api.post(`/projects/apply/${id}`);
    alert('Application submitted');
  };

  if (!project) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p>{project.description}</p>
      <p>Lead: {project.lead?.name}</p>
      <p>Members: {project.members?.length}/{project.maxMembers}</p>
      <button onClick={apply} className="bg-accent text-white px-3 py-1">Apply</button>
    </div>
  );
};

export default ProjectDetailPage;
