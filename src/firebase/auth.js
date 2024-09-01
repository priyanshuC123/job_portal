import { auth } from './setup';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from './setup';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID package for unique IDs

export const signUpWithEmailPassword = async (email, password, role, additionalInfo) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Generate a unique ID for the university if role is university_employee
    if (role === 'university_employee') {
      const universityId = uuidv4();
      const universityRef = doc(db, 'university', universityId);
      const universityDoc = await getDoc(universityRef);

      if (universityDoc.exists()) {
        alert('University already exists.');
        return null;
      } else {
        additionalInfo.universityId = universityId;
      }
    }

    // Save user information based on their role
    const userData = {
      email: user.email,
      role: role,
      ...additionalInfo,
      createdAt: new Date(),
    };

    if (role === 'student') {
      await setDoc(doc(db, "students", user.uid), userData);
    } else if (role === 'employer') {
      await setDoc(doc(db, "employers", user.uid), userData);
    } else if (role === 'university_employee') {
      await setDoc(doc(db, "universities", additionalInfo.universityId), userData);
    }

    await setDoc(doc(db, "users", user.uid), userData);

    return user;
  } catch (error) {
    console.error("Error during sign-up:", error);
    return null;
  }
};

// Sign out
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};

// Sign in with Email and Password
export const signInWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return { user, role: userData.role };
    } else {
      console.error("User document not found.");
      return null;
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    return null;
  }
};
