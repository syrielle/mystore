import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCA9bWne311epdFKm65F9kE5pJuCXXegks",
  authDomain: "bijoux-shop-f86ad.firebaseapp.com",
  projectId: "bijoux-shop-f86ad",
  storageBucket: "bijoux-shop-f86ad.firebasestorage.app",
  messagingSenderId: "431861023741",
  appId: "1:431861023741:web:7b7a153d1712c2f6548f94",
  measurementId: "G-D54XSC8322"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
