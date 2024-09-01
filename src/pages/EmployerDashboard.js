import React, { useState, useEffect } from 'react';
import { getJobsByEmployer } from '../firebase/jobs';
import { Link } from 'react-router-dom';

const EmployerDashboard = ({ user }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      if (user && user.uid) {
        const jobsData = await getJobsByEmployer(user.uid);
        setJobs(jobsData);
      }
    };

    fetchJobs();
  }, [user]);

  return (
    <div className="container mx-auto py-10 px-4 md:px-10 lg:px-20 pt-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Employer Dashboard</h1>
        <Link to="/post-job" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Post a New Job
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Your Job Listings</h2>
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="text-gray-700">
                  <p className="mb-2"><strong>Location:</strong> {job.location}</p>
                  <p className="mb-2"><strong>Salary Range:</strong> {job.salaryRange}</p>
                  <p className="mb-2"><strong>Employment Type:</strong> {job.employmentType}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You haven't posted any jobs yet.</p>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
