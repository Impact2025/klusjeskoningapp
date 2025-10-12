// Firebase configuration
const firebaseConfig = {
  projectId: "studio-9831032288-7703b",
  appId: "1:944059073266:web:ecd08521a4b104db88466b",
  apiKey: "AIzaSyAtetHx8VhMoe0vdMtm6xdUTT9LlSo36E8",
  authDomain: "studio-9831032288-7703b.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "944059073266",
  storageBucket: "studio-9831032288-7703b.firebasestorage.app",
};

// Lazy initialization - only when accessed in browser
let firebaseInitialized = false;
let firebaseApp: any = undefined;
let firebaseAuth: any = undefined;
let firebaseDb: any = undefined;
let firebaseStorage: any = undefined;

function initFirebase() {
  if (typeof window === 'undefined' || firebaseInitialized) {
    return;
  }

  try {
    const { initializeApp, getApps, getApp } = require('firebase/app');
    const { getAuth } = require('firebase/auth');
    const { getFirestore } = require('firebase/firestore');
    const { getStorage } = require('firebase/storage');

    firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    firebaseAuth = getAuth(firebaseApp);
    firebaseDb = getFirestore(firebaseApp);
    firebaseStorage = getStorage(firebaseApp);
    firebaseInitialized = true;
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

// Getter functions that initialize on first access
export const getFirebaseApp = () => {
  if (typeof window === 'undefined') return undefined;
  if (!firebaseInitialized) initFirebase();
  return firebaseApp;
};

export const getFirebaseAuth = () => {
  if (typeof window === 'undefined') return undefined;
  if (!firebaseInitialized) initFirebase();
  return firebaseAuth;
};

export const getFirebaseDb = () => {
  if (typeof window === 'undefined') return undefined;
  if (!firebaseInitialized) initFirebase();
  return firebaseDb;
};

export const getFirebaseStorage = () => {
  if (typeof window === 'undefined') return undefined;
  if (!firebaseInitialized) initFirebase();
  return firebaseStorage;
};

// Legacy exports for backward compatibility
export const app = typeof window !== 'undefined' ? getFirebaseApp() : undefined;
export const auth = typeof window !== 'undefined' ? getFirebaseAuth() : undefined;
export const db = typeof window !== 'undefined' ? getFirebaseDb() : undefined;
export const storage = typeof window !== 'undefined' ? getFirebaseStorage() : undefined;
