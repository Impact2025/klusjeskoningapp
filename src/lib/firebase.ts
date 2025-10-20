import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "studio-9831032288-7703b",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:944059073266:web:ecd08521a4b104db88466b",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyAtetHx8VhMoe0vdMtm6xdUTT9LlSo36E8",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "studio-9831032288-7703b.firebaseapp.com",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "944059073266",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "studio-9831032288-7703b.firebasestorage.app",
};

// Initialize Firebase immediately
const firebaseApp: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const firebaseAuth: Auth = getAuth(firebaseApp);
const firebaseDb: Firestore = getFirestore(firebaseApp);
const firebaseStorage: FirebaseStorage = getStorage(firebaseApp);

// Export the initialized services
export { firebaseApp as app, firebaseAuth as auth, firebaseDb as db, firebaseStorage as storage };

// Also export getter functions for consistency
export const getFirebaseApp = () => firebaseApp;
export const getFirebaseAuth = () => firebaseAuth;
export const getFirebaseDb = () => firebaseDb;
export const getFirebaseStorage = () => firebaseStorage;