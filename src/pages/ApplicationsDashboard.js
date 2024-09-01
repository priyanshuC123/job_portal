import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/setup';

const ApplicationsDashboard = ({ user }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const q = query(collection(db, 'applications'), where('employerId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const applicationsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(applicationsList);
      setLoading(false);
    };

    fetchApplications();
  }, [user.uid]);

  const handleStatusChange = async (applicationId, newStatus) => {
    const applicationRef = doc(db, 'applications', applicationId);
    await updateDoc(applicationRef, { status: newStatus });
    setApplications(applications.map(app => app.id === applicationId ? { ...app, status: newStatus } : app));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Applications Dashboard</h1>
      <div className="w-full max-w-4xl">
        {applications.map((application) => (
          <div key={application.id} className="bg-white p-6 mb-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Job ID: {application.jobId}</h2>
            <p className="text-gray-700 mb-2"><strong>Status:</strong> {application.status}</p>
            <p className="text-gray-700 mb-2"><strong>Student ID:</strong> {application.studentId}</p>
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700">Update Status:</label>
              <select
                id="status"
                value={application.status}
                onChange={(e) => handleStatusChange(application.id, e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsDashboard;
