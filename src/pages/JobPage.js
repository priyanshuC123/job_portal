import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/setup';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsCollection = collection(db, 'jobs');
      const jobSnapshot = await getDocs(jobsCollection);
      const jobList = await Promise.all(jobSnapshot.docs.map(async (jobDoc) => {
        const jobData = jobDoc.data();
        const employerDoc = await getDoc(doc(db, 'employers', jobData.employerId));
        const employerData = employerDoc.exists() ? employerDoc.data() : {};
        return { id: jobDoc.id, ...jobData, companyName: employerData.companyName };
      }));
      setJobs(jobList);
    };

    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto mt-8 px-4 pt-20">
      <h1 className="text-3xl font-bold mb-8">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
            <p className="text-lg font-semibold text-gray-700 mb-1">Company: <span className="font-bold">{job.companyName}</span></p>
            <p className="text-lg text-gray-700 mb-1">Location: {job.location}</p>
            <p className="text-lg text-gray-700 mb-1">Salary: {job.salaryRange}</p>
            <p className="text-lg text-gray-700 mb-4">Role: {job.employmentType}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              onClick={() => window.location.href = `/jobs/${job.id}`}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
