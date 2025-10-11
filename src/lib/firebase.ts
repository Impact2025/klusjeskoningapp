import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "studio-9831032288-7703b",
  appId: "1:944059073266:web:ecd08521a4b104db88466b",
  apiKey: "AIzaSyAtetHx8VhMoe0vdMtm6xdUTT9LlSo36E8",
  authDomain: "studio-9831032288-7703b.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "944059073266",
  storageBucket: "studio-9831032288-7703b.firebasestorage.app",
};

// Only initialize Firebase in the browser
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

// Initialize function that only runs in browser
function initFirebase() {
  if (typeof window === 'undefined') {
    return;
  }

  if (!app) {
    const { initializeApp, getApps, getApp } = require('firebase/app');
    const { getAuth } = require('firebase/auth');
    const { getFirestore } = require('firebase/firestore');
    const { getStorage } = require('firebase/storage');

    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  }
}

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  initFirebase();
}

export { app, auth, db, storage };
