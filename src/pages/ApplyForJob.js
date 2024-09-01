// src/pages/ApplyForJob.js

import React from 'react';
import { applyForJob } from '../firebase/applications';

const ApplyForJob = ({ jobId, studentId }) => {
  const handleApply = async () => {
    await applyForJob({ jobId, studentId, status: 'Applied', appliedAt: new Date() });
    alert('Applied for job successfully!');
  };

  return (
    <button onClick={handleApply} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
      Apply for Job
    </button>
  );
};

export default ApplyForJob;
