import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhFOq3NkuYkGRgNvG_W73J08_k9yrV6ms",
  authDomain: "rapheals-blog.firebaseapp.com",
  projectId: "rapheals-blog",
  storageBucket: "rapheals-blog.firebasestorage.app",
  messagingSenderId: "98717863009",
  appId: "1:98717863009:web:4bed08ffbc2d6e79bcee20",
  measurementId: "G-6EBN5VKLF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
