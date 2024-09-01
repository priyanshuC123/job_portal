import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUpWithEmailPassword } from '../firebase/auth';

const allowedUniversities = [
  'IIT Bombay', 'IIT Delhi', 'IIT Kharagpur', 'IIT Madras', 'IIT Kanpur', 
  'IIT Roorkee', 'IIT Guwahati', 'IIT Hyderabad', 'IIT Bhubaneswar', 'IIT Gandhinagar',
  'NIT Trichy', 'NIT Surathkal', 'NIT Warangal', 'NIT Rourkela', 'NIT Calicut',
  'NIT Durgapur', 'NIT Jamshedpur', 'NIT Kurukshetra', 'NIT Silchar', 'NIT Hamirpur',
  'BITS Pilani', 'VIT Vellore', 'IIIT Hyderabad', 'DTU Delhi'
];


const SignUp = ({ setUser, setRole }) => {
  const [role, setRoleState] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState({});
  const [university, setUniversity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setRoleState('student'); // Ensure 'student' is auto-selected on load
  }, []);

  const handleRoleSelect = (selectedRole) => {
    setRoleState(selectedRole);
    setAdditionalInfo({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role: Student, Employer, or University Employee");
      return;
    }

    if (role === 'student' && !allowedUniversities.includes(university)) {
      alert('Registration is only allowed for students from specific universities.');
      return;
    }

    const result = await signUpWithEmailPassword(email, password, role, { ...additionalInfo, university });

    if (result) {
      setUser(result);
      setRole(role);

      if (role === 'student') {
        navigate('/jobs');
      } else if (role === 'employer') {
        navigate('/dashboard');
      } else if (role === 'university_employee') {
        navigate('/university-profile');
      }
    } else {
      alert("Sign-up failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center pt-20 justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <div className="mb-4">
        <button
          onClick={() => handleRoleSelect('student')}
          className={`px-6 py-2 rounded-lg ${role === 'student' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
        >
          I am a Student
        </button>
        <button
          onClick={() => handleRoleSelect('employer')}
          className={`ml-4 px-6 py-2 rounded-lg ${role === 'employer' ? 'bg-green-700 text-white' : 'bg-green-500 text-white hover:bg-green-700'}`}
        >
          I am an Employer
        </button>
        <button
          onClick={() => handleRoleSelect('university_employee')}
          className={`ml-4 px-6 py-2 rounded-lg ${role === 'university_employee' ? 'bg-purple-700 text-white' : 'bg-purple-500 text-white hover:bg-purple-700'}`}
        >
          I am a University Employee
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {role === 'student' && (
          <div className="mb-4">
            <label htmlFor="university" className="block text-gray-700">University:</label>
            <select
              id="university"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select University</option>
              {allowedUniversities.map((uni) => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>
          </div>
        )}

        {role === 'student' && (
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-700">Full Name:</label>
            <input
              type="text"
              id="fullname"
              value={additionalInfo.fullname || ''}
              onChange={(e) => setAdditionalInfo({ ...additionalInfo, fullname: e.target.value })}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <label htmlFor="course" className="block text-gray-700">Course:</label>
            <input
              type="text"
              id="course"
              value={additionalInfo.course || ''}
              onChange={(e) => setAdditionalInfo({ ...additionalInfo, course: e.target.value })}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <label htmlFor="graduationYear" className="block text-gray-700">Graduation Year:</label>
            <input
              type="text"
              id="graduationYear"
              value={additionalInfo.graduationYear || ''}
              onChange={(e) => setAdditionalInfo({ ...additionalInfo, graduationYear: e.target.value })}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        {role === 'employer' && (
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-700">Company Name:</label>
            <input
              type="text"
              id="companyName"
              value={additionalInfo.companyName || ''}
              onChange={(e) => setAdditionalInfo({ ...additionalInfo, companyName: e.target.value })}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <label htmlFor="industry" className="block text-gray-700">Industry:</label>
            <input
              type="text"
              id="industry"
              value={additionalInfo.industry || ''}
              onChange={(e) => setAdditionalInfo({ ...additionalInfo, industry: e.target.value })}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <label htmlFor="location" className="block text-gray-700">Location:</label>
            <input
              type="text"
              id="location"
              value={additionalInfo.location || ''}
              onChange={(e) => setAdditionalInfo({ ...additionalInfo, location: e.target.value })}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <label htmlFor="website" className="block text-gray-700">Website:</label>
            <input
              type="url"
              id="website"
              value={additionalInfo.website || ''}
              onChange={(e) => setAdditionalInfo({ ...additionalInfo, website: e.target.value })}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        )}

        {role === 'university_employee' && (
          <div className="mb-4">
            <label htmlFor="universityName" className="block text-gray-700">University Name:</label>
            <input
              type="text"
              id="universityName"
              value={additionalInfo.universityName || ''}
              onChange={(e) => setAdditionalInfo({ ...additionalInfo, universityName: e.target.value })}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
        )}

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">
          Sign Up
        </button>
      </form>
      <div className="mt-4">
        <p className="text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
