// src/firebase.js
// Firebase App (the core library) is always required and must be listed first
import { initializeApp } from 'firebase/app';

// Add Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore'; // Uncomment if using Firestore
// import { getStorage } from 'firebase/storage'; // Uncomment if using Storage

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// --- FIX: Use VITE_ prefix for Vite environment variables ---
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:  import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:  import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // If you added it
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
// const db = getFirestore(app); // Uncomment if using Firestore
// const storage = getStorage(app); // Uncomment if using Storage

// Export the service instances you need
export {
  auth,
  // db, // Uncomment if using Firestore
  // storage, // Uncomment if using Storage
};