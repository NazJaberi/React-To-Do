import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkVsAO45sB-LnjaGv2KyKrJpbEQUQXitk",
  authDomain: "todo-app-7150b.firebaseapp.com",
  projectId: "todo-app-7150b",
  storageBucket: "todo-app-7150b.firebasestorage.app",
  messagingSenderId: "486874729717",
  appId: "1:486874729717:web:897fd0bcb0923f24c2c9bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };