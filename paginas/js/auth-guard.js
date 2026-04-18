// ../js/auth-guard.js

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    // não está logado → volta pro login
    window.location.href = "../html/index.html";
  } else {
    console.log("Usuário logado:", user.email);
  }
});