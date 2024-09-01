import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/setup';

const ApplicationsPage = ({ user }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const q = query(collection(db, 'applications'), where('studentId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const applicationsList = await Promise.all(
        querySnapshot.docs.map(async (docSnapshot) => {
          const applicationData = docSnapshot.data();
          const jobDoc = await getDoc(doc(db, 'jobs', applicationData.jobId));
          if (jobDoc.exists()) {
            const jobData = jobDoc.data();
            const employerDoc = await getDoc(doc(db, 'employers', jobData.employerId));
            const companyName = employerDoc.exists() ? employerDoc.data().companyName : 'Unknown Company';
            return {
              id: docSnapshot.id,
              ...applicationData,
              jobTitle: jobData.title,
              companyName,
            };
          }
          return null;
        })
      );
      setApplications(applicationsList.filter(app => app !== null));
      setLoading(false);
    };

    fetchApplications();
  }, [user.uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-20">
      <h1 className="text-4xl font-bold mb-8">My Applications</h1>
      <div className="w-full max-w-4xl mx-auto">
        {applications.map((application) => (
          <div key={application.id} className="bg-white p-6 mb-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">{application.jobTitle}</h2>
            <p className="text-gray-700 mb-2"><strong>Job ID:</strong> {application.jobId}</p>
            <p className="text-gray-700 mb-2"><strong>Company:</strong> {application.companyName}</p>
            <p className="text-gray-700 mb-2"><strong>Status:</strong> {application.status}</p>
            <p className="text-gray-700"><strong>Applied At:</strong> {new Date(application.appliedAt.seconds * 1000).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage;
