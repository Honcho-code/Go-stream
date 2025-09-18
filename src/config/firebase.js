import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDuoDzbd2bfPv95BUns2UhBqqwwS5a2Qmo",
  authDomain: "gostream-e4fa8.firebaseapp.com",
  projectId: "gostream-e4fa8",
  storageBucket: "gostream-e4fa8.firebasestorage.app",
  messagingSenderId: "692265549326",
  appId: "1:692265549326:web:39d6659022ad8041f0465f",
  measurementId: "G-9ZVGBLFKPN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);