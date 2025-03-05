import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAER8ZTwpsl4jnYwza20x7zinZaN2xxpwE",
  authDomain: "recipeapp-7e47d.firebaseapp.com",
  projectId: "recipeapp-7e47d",
  storageBucket: "recipeapp-7e47d.firebasestorage.app",
  messagingSenderId: "620836953184",
  appId: "1:620836953184:web:1618d51d2af2b292d4f705"
};

// Check if Firebase is already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Check if Auth is already initialized
const auth = getAuth(app);
if (!auth.app.options) {
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Firestore instance
const db = getFirestore(app);

export { app, auth, db };
