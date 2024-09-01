import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../firebase/auth';

const Navbar = ({ user, role }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full h-16 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center h-full">
        <div className="text-white text-xl font-bold">
          <Link to="/">Jazzee</Link>
        </div>
        <ul className="flex space-x-4">
          {role === 'student' && <li><Link to="/jobs" className="text-white hover:text-gray-300">Jobs</Link></li>}
          {role === 'student' && <li><Link to="/profile" className="text-white hover:text-gray-300">My Profile</Link></li>}
          {role === 'student' && <li><Link to="/applications" className="text-white hover:text-gray-300">My Applications</Link></li>}
          {role === 'employer' && <li><Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link></li>}
          {role === 'employer' && <li><Link to="/post-job" className="text-white hover:text-gray-300">Post Job</Link></li>}
          {role === 'employer' && <li><Link to="/applications-dashboard" className="text-white hover:text-gray-300">Applications Dashboard</Link></li>}
          {(role === 'university_employee' || role === 'employer') && <li><Link to="/universities" className="text-white hover:text-gray-300">Universities</Link></li>}
          {role === 'university_employee' && <li><Link to="/university-profile" className="text-white hover:text-gray-300">University Profile</Link></li>}
          {user ? (
            <li>
              <button onClick={handleLogout} className="text-white hover:text-gray-300">
                Logout
              </button>
            </li>
          ) : (
            <>
              <li><Link to="/login" className="text-white hover:text-gray-300">Login</Link></li>
              <li><Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
