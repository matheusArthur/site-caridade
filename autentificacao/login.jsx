import React from "react";
import { auth, db } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Login() {
  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Faz login com popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Usuário logado:", user);

      // Cria referência do documento no Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // Se o usuário não existir no banco, salva dados básicos
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          nome: user.displayName,
          email: user.email,
          foto: user.photoURL,
          criadoEm: new Date()
        });
        console.log("Novo usuário salvo no Firestore!");
      } else {
        console.log("Usuário já existe no Firestore.");
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={loginGoogle}>Entrar com Google</button>
    </div>
  );
}

export default Login;