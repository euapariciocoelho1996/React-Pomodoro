import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASK9HpvLrP4n1AOvNiTdxoaLgIXbv4TdY",
  authDomain: "usuarios-pomodoro.firebaseapp.com",
  projectId: "usuarios-pomodoro",
  storageBucket: "usuarios-pomodoro.firebasestorage.app",
  messagingSenderId: "123345659357",
  appId: "1:123345659357:web:a7af0f994449a036504234",
  measurementId: "G-1G85C0T5YR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth }; 