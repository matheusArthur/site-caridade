
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBerrzBXG7xEPY-zokNSzxsOLcCXHvSKyA",
  authDomain: "caridade-6464e.firebaseapp.com",
  projectId: "caridade-6464e",
  storageBucket: "caridade-6464e.firebasestorage.app",
  messagingSenderId: "916897058334",
  appId: "1:916897058334:web:906d1343b3523b3a9ca80f",
  measurementId: "G-43S84XLM13"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);