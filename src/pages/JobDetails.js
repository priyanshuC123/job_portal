import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/setup';
import { useNavigate } from 'react-router-dom';

const JobDetails = ({ user }) => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [employer, setEmployer] = useState(null); // State to store employer details
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      const jobDoc = await getDoc(doc(db, 'jobs', jobId));
      if (jobDoc.exists()) {
        const jobData = jobDoc.data();
        setJob(jobData);

        // Fetch employer details using employerId from the job document
        const employerDoc = await getDoc(doc(db, 'employers', jobData.employerId));
        if (employerDoc.exists()) {
          setEmployer(employerDoc.data());
        }
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleApply = async () => {
    if (!user) {
      alert('Please log in to apply for the job.');
      navigate('/login');
      return;
    }

    if (!job || !Array.isArray(job.allowedColleges)) {
      alert('The eligibility criteria for this job have not been set. Please contact the employer for details.');
      return;
    }

    console.log('User University:', user.university);

    const isEligible = job.allowedColleges.some(college => {
      console.log('College Value:', college.value);
      return college.value === user.university;
    });

    if (!isEligible) {
      alert('Your university is not eligible to apply for this job.');
      return;
    }

    const applicationData = {
      jobId: jobId,
      studentId: user.uid,
      employerId: job.employerId,
      status: 'Pending',
      appliedAt: new Date(),
    };

    await setDoc(doc(db, 'applications', `${jobId}_${user.uid}`), applicationData);

    setApplied(true);
    alert('Application submitted successfully!');
  };

  if (!job || !employer) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <p className="text-gray-800 mb-2"><strong>Company:</strong> {employer.companyName}</p>
        <p className="text-gray-800 mb-2"><strong>Location:</strong> {job.location}</p>
        <p className="text-gray-800 mb-2"><strong>Industry:</strong> {employer.industry}</p>
        <p className="text-gray-800 mb-2"><strong>Employment Type:</strong> {job.employmentType}</p>
        <p className="text-gray-800 mb-4"><strong>Salary Range:</strong> {job.salaryRange}</p>

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Job Description</h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Requirements</h2>
          <p className="text-gray-700 leading-relaxed">{job.requirements}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Eligible Colleges</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            {job.allowedColleges.map((college, index) => (
              <li key={index}>{college.label}</li>
            ))}
          </ul>
        </div>

        <button
          className={`w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 ${applied ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={applied}
          onClick={handleApply}
        >
          {applied ? 'Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
