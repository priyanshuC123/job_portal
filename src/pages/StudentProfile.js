import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/setup';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    fullname: '',
    course: '',
    graduationYear: '',
    university: '',
    resumeUrl: '',
  });
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const profileDoc = await getDoc(doc(db, 'students', user.uid));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data());
          setSkills(profileDoc.data().skills || []);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, 'students', user.uid), {
        ...profile,
        skills,
      });
      alert('Profile updated successfully!');
    }
  };

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="container mx-auto mt-8 px-4 mb-8 pt-20">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>
      <form onSubmit={handleProfileUpdate} className="space-y-6">
        <div>
          <label htmlFor="fullname" className="block text-gray-700 text-lg font-medium">Full Name</label>
          <input
            type="text"
            id="fullname"
            value={profile.fullname}
            onChange={(e) => setProfile({ ...profile, fullname: e.target.value })}
            className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="course" className="block text-gray-700 text-lg font-medium">Course</label>
          <input
            type="text"
            id="course"
            value={profile.course}
            onChange={(e) => setProfile({ ...profile, course: e.target.value })}
            className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="graduationYear" className="block text-gray-700 text-lg font-medium">Graduation Year</label>
          <input
            type="text"
            id="graduationYear"
            value={profile.graduationYear}
            onChange={(e) => setProfile({ ...profile, graduationYear: e.target.value })}
            className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="university" className="block text-gray-700 text-lg font-medium">University</label>
          <input
            type="text"
            id="university"
            value={profile.university}
            onChange={(e) => setProfile({ ...profile, university: e.target.value })}
            className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="resumeUrl" className="block text-gray-700 text-lg font-medium">Resume URL</label>
          <input
            type="url"
            id="resumeUrl"
            value={profile.resumeUrl}
            onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
            className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-lg font-medium">Skills</label>
          <div className="flex items-center mt-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a skill"
            />
            <button
              type="button"
              onClick={addSkill}
              className="ml-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Add+
            </button>
          </div>
          <div className="mt-4">
            {skills.map(skill => (
              <span key={skill} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
