import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBnCZUHhKzIl2oQDDP-TweCEg5oHcDl-K4",
  authDomain: "platoonix-pilot.firebaseapp.com",
  projectId: "platoonix-pilot",
  storageBucket: "platoonix-pilot.firebasestorage.app",
  messagingSenderId: "938735931414",
  appId: "1:938735931414:web:5ef7fdba66df72981fe537",
  measurementId: "G-902ZE8H22V"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);