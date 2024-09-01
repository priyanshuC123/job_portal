// src/firebase/jobs.js

import { db } from './setup';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// src/firebase/jobs.js

export const postJob = async (jobData) => {
  try {
    await addDoc(collection(db, "jobs"), jobData);
  } catch (error) {
    console.error("Error posting job:", error);
  }
};


// Function to get jobs by employer ID
export const getJobsByEmployer = async (employerId) => {
  const jobsCollectionRef = collection(db, 'jobs');
  const q = query(jobsCollectionRef, where('employerId', '==', employerId));
  const jobSnapshots = await getDocs(q);
  return jobSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to get all jobs
export const getAllJobs = async () => {
  const jobsCollectionRef = collection(db, 'jobs');
  const jobSnapshots = await getDocs(jobsCollectionRef);
  return jobSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
