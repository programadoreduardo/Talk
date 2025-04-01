import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9UGb8ax6Mi6h8vHQXNvQZpGMCmNRI3Xc",
  authDomain: "fir-chat-bf94c.firebaseapp.com",
  projectId: "fir-chat-bf94c",
  storageBucket: "fir-chat-bf94c.firebasestorage.app",
  messagingSenderId: "836036078051",
  appId: "1:836036078051:web:05eb655c8fca4a9a24d8d6"
};

// Verifica se já existe um app inicializado, senão inicializa um novo
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Configura o Auth com persistência
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');
export { auth, db };