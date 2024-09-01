import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobPage';
import JobDetails from './pages/JobDetails';
import ApplicationsPage from './pages/ApplicationsPage';
import ApplicationsDashboard from './pages/ApplicationsDashboard';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import StudentProfile from './pages/StudentProfile';
import EmployerDashboard from './pages/EmployerDashboard';
import PostJob from './pages/PostJob';
import UniversityPage from './pages/UniversityPage';
import UniversityProfilePage from './pages/UniversityProfilePage';
import { auth } from './firebase/setup';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './firebase/setup';

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({ uid: currentUser.uid, ...userData });
          setRole(userData.role);
          localStorage.setItem('role', userData.role);
        } else {
          setUser(null);
          setRole(null);
          console.error("User role not found in Firestore.");
        }
      } else {
        setUser(null);
        setRole(null);
        localStorage.removeItem('role');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar user={user} role={role} />
      <Routes>
        <Route path="/" element={<HomePage user={user} role={role} />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:jobId" element={<JobDetails user={user} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} setRole={setRole} />} />
        <Route path="/signup" element={<SignUpPage setUser={setUser} setRole={setRole} />} />
        {role === 'student' && <Route path="/profile" element={<StudentProfile user={user} />} />}
        {role === 'student' && <Route path="/applications" element={<ApplicationsPage user={user} />} />}
        {role === 'employer' && <Route path="/dashboard" element={<EmployerDashboard user={user} />} />}
        {role === 'employer' && <Route path="/post-job" element={<PostJob employerId={user.uid} />} />}
        {role === 'employer' && <Route path="/applications-dashboard" element={<ApplicationsDashboard user={user} />} />}
        {(role === 'university_employee' || role === 'employer') && <Route path="/universities" element={<UniversityPage />} />}
        {role === 'university_employee' && <Route path="/university-profile" element={<UniversityProfilePage />} />}
      </Routes>
    </>
  );
};

export default App;
