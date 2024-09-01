import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/setup';

const UniversityProfilePage = () => {
  const [universityData, setUniversityData] = useState({
    name: '',
    history: '',
    achievements: '',
    messageToEmployers: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversityData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }

      const universityRef = doc(db, 'universities', user.uid);
      const universityDoc = await getDoc(universityRef);

      if (universityDoc.exists()) {
        setUniversityData(universityDoc.data());
      }
      setLoading(false);
    };

    fetchUniversityData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUniversityData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to update the profile.');
      return;
    }

    try {
      await setDoc(doc(db, 'universities', user.uid), universityData);
      alert('University profile updated successfully!');
    } catch (error) {
      console.error('Error updating university profile:', error);
      alert('Failed to update university profile. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center pt-20">
      <h1 className="text-4xl font-bold mb-8">University Profile</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">University Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={universityData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="history" className="block text-gray-700">History:</label>
          <textarea
            id="history"
            name="history"
            value={universityData.history}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="achievements" className="block text-gray-700">Notable Achievements:</label>
          <textarea
            id="achievements"
            name="achievements"
            value={universityData.achievements}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="messageToEmployers" className="block text-gray-700">Message to Employers:</label>
          <textarea
            id="messageToEmployers"
            name="messageToEmployers"
            value={universityData.messageToEmployers}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UniversityProfilePage;
