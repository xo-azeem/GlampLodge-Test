import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
console.log("=== ENVIRONMENT VARIABLES DEBUG ===");
console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("Firebase Auth Domain:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log("Firebase Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log("Firebase Messaging Sender ID:", import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID);
console.log("Firebase App ID:", import.meta.env.VITE_FIREBASE_APP_ID);
console.log("Firebase Measurement ID:", import.meta.env.VITE_FIREBASE_MEASUREMENT_ID);
console.log("=====================================");

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Add error boundary for Firebase
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (event.error && event.error.message && event.error.message.includes('firebase')) {
      console.error('Firebase error detected:', event.error);
    }
  });
}

export default app;
