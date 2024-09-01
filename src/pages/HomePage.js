import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ user, role }) => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    if (!user) {
      navigate('/login');
    } else if (role === 'student') {
      navigate('/jobs');
    } else if (role === 'employer') {
      navigate('/dashboard');
    } else if (role === 'university_employee') {
      navigate('/universities');
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Jazzee</h1>
        <p className="text-lg text-gray-700 mb-8">
          Connecting students, universities, and employers like never before. 
          Achieve your career goals with the best opportunities available.
        </p>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-blue-500 mb-4">Why Choose Jazzee?</h2>
          <ul className="list-disc list-inside text-left text-gray-700">
            <li className="mb-2">Students: Find your dream job with our curated listings.</li>
            <li className="mb-2">Universities: Showcase your institution and boost your placement rates.</li>
            <li className="mb-2">Employers: Discover top talent from leading universities.</li>
            <li className="mb-2">Personalized Recommendations: Get job matches based on your profile.</li>
            <li className="mb-2">Seamless Integration: Sync with your existing job boards and platforms.</li>
          </ul>
        </div>

        <button 
          onClick={handleExploreClick} 
          className="px-8 py-3 bg-blue-500 text-white rounded-full text-lg hover:bg-blue-700 transition-colors duration-300"
        >
          {user ? 'Explore Now' : 'Login to Explore'}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
