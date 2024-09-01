// src/firebase/students.js

import { db } from './setup';
import { doc, setDoc, getDoc } from "firebase/firestore";

// Function to add or update a student profile
export const addOrUpdateStudentProfile = async (uid, profileData) => {
  const studentDocRef = doc(db, 'students', uid);
  await setDoc(studentDocRef, profileData, { merge: true });
};

// Function to get a student profile
export const getStudentProfile = async (uid) => {
  const studentDocRef = doc(db, 'students', uid);
  const studentSnapshot = await getDoc(studentDocRef);
  return studentSnapshot.exists() ? studentSnapshot.data() : null;
};
