// Importa Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup, 
  GoogleAuthProvider,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// 🔥 SUA CONFIGURAÇÃO DO FIREBASE (pegar no console.firebase.google.com)
const firebaseConfig = {
  apiKey: "AIzaSyBerrzBXG7xEPY-zokNSzxsOLcCXHvSKyA",
  authDomain: "caridade-6464e.firebaseapp.com",
  projectId: "caridade-6464e",
  storageBucket: "caridade-6464e.firebasestorage.app",
  messagingSenderId: "916897058334",
  appId: "1:916897058334:web:906d1343b3523b3a9ca80f"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ===== LOGIN COM EMAIL/SENHA =====
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Login realizado com sucesso!");
    window.location.href = "home.html"; // redireciona após login
  } catch (error) {
    alert("❌ Erro no login: " + error.message);
  }
});

// ===== CADASTRO =====
const linkCadastro = document.getElementById("linkCadastro");
linkCadastro.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = prompt("Digite seu email:");
  const password = prompt("Digite sua senha:");

  if (email && password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ Cadastro realizado com sucesso!");
    } catch (error) {
      alert("❌ Erro no cadastro: " + error.message);
    }
  }
});

// ===== LOGIN COM GOOGLE =====
const googleLogin = document.getElementById("googleLogin");
googleLogin.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await signInWithPopup(auth, provider);
    alert("✅ Login com Google realizado!");
    window.location.href = "home.html";
  } catch (error) {
    alert("❌ Erro: " + error.message);
  }
});

// ===== RESET DE SENHA =====
const resetPassword = document.getElementById("resetPassword");
resetPassword.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = prompt("Digite seu email para redefinir a senha:");
  if (email) {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("📩 Email de redefinição enviado!");
    } catch (error) {
      alert("❌ Erro: " + error.message);
    }
  }
});
