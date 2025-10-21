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

// Initialize Firebase services lazily to prevent SSR issues
let firebaseApp: FirebaseApp;
let firebaseAuth: Auth;
let firebaseDb: Firestore;
let firebaseStorage: FirebaseStorage;

// Getter functions that initialize services only when needed
export const getFirebaseApp = (): FirebaseApp => {
  if (!firebaseApp) {
    firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return firebaseApp;
};

export const getFirebaseAuth = (): Auth => {
  if (!firebaseAuth) {
    firebaseAuth = getAuth(getFirebaseApp());
  }
  return firebaseAuth;
};

export const getFirebaseDb = (): Firestore => {
  if (!firebaseDb) {
    firebaseDb = getFirestore(getFirebaseApp());
  }
  return firebaseDb;
};

export const getFirebaseStorage = (): FirebaseStorage => {
  if (!firebaseStorage) {
    firebaseStorage = getStorage(getFirebaseApp());
  }
  return firebaseStorage;
};

// For backward compatibility, but recommend using getter functions
export const app = getFirebaseApp();
export const auth = getFirebaseAuth();
export const db = getFirebaseDb();
export const storage = getFirebaseStorage();