import admin from "firebase-admin";
import firebaseInfo from "./firebase-info.js";

console.log('Initializing Firebase Admin SDK...');

// Check if required Firebase environment variables are present
const requiredVars = ['FIREBASE_TYPE', 'FIREBASE_PROJECT_ID', 'FIREBASE_PRIVATE_KEY', 'FIREBASE_CLIENT_EMAIL'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing Firebase environment variables:', missingVars);
  throw new Error(`Missing Firebase environment variables: ${missingVars.join(', ')}`);
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseInfo as admin.ServiceAccount)
  });
  console.log('Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('Failed to initialize Firebase Admin SDK:', error);
  throw error;
}

export default admin;

