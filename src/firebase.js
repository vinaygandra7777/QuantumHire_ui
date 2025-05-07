// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// Read values from environment variables prefixed with REACT_APP_
const firebaseConfig = {
  apiKey:  import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:  import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:  import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:  import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.REACT_APP_FIREBASE_APP_ID
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID // If you added it
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(app);

export { auth };