import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/setup';

const UniversityPage = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      const querySnapshot = await getDocs(collection(db, 'universities'));
      const universityList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUniversities(universityList);
      setLoading(false);
    };

    fetchUniversities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col py-10 px-4 md:px-10 lg:px-20 pt-20">
      <h1 className="text-4xl font-bold mb-8">Universities</h1>
      <div className="w-full max-w-4xl">
        {universities.map((university) => (
          <div key={university.id} className="bg-white p-6 mb-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-purple-700 mb-2">{university.universityName}</h2>
            <p className="text-gray-700 mb-2"><strong>History:</strong> {university.history}</p>
            <p className="text-gray-700 mb-2"><strong>Achievements:</strong> {university.achievements}</p>
            <p className="text-gray-700"><strong>Message to Employers:</strong> {university.messageToEmployers}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityPage;
