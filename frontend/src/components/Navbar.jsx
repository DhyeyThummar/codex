import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200 p-4 flex justify-between">
      <div className="font-bold text-accent">Project-Connect</div>
      {user && (
        <div className="flex gap-3 text-sm">
          <Link to="/home">Home</Link>
          <Link to="/create-project">Create</Link>
          <Link to="/talent">Talent</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
