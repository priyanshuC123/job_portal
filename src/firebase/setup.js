// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // Import for Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ98MtXLQzfr3YTOMFyA9sPR2U_0ihe8Y",
  authDomain: "jobportal-1ee28.firebaseapp.com",
  projectId: "jobportal-1ee28",
  storageBucket: "jobportal-1ee28.appspot.com",
  messagingSenderId: "489634129378",
  appId: "1:489634129378:web:1489a2dfaed5e4377705bb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Failed to set persistence:", error);
  });
