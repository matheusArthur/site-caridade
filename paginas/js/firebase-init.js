const firebaseConfig = window.firebaseConfig || {
  apiKey: "AIzaSyBerrzBXG7xEPY-zokNSzxsOLcCXHvSKyA",
  authDomain: "caridade-6464e.firebaseapp.com",
  projectId: "caridade-6464e",
  storageBucket: "caridade-6464e.firebasestorage.app",
  messagingSenderId: "916897058334",
  appId: "1:916897058334:web:906d1343b3523b3a9ca80f",
};

window.firebaseConfig = firebaseConfig;

if (!firebase.apps || !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}