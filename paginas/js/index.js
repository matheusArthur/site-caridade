const FIREBASE_APP_SRC = "https://www.gstatic.com/firebasejs/9.6.7/firebase-app-compat.js";
const FIREBASE_AUTH_SRC = "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth-compat.js";

function carregarScript(src) {
  return new Promise((resolve, reject) => {
    const scriptExistente = Array.from(document.scripts).find(script =>
      script.getAttribute("src") === src || script.src === new URL(src, document.baseURI).href
    );

    if (scriptExistente) {
      scriptExistente.addEventListener("load", resolve, { once: true });
      scriptExistente.addEventListener("error", reject, { once: true });
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function carregarFirebaseAuth() {
  let promessa = Promise.resolve();

  if (!window.firebase) {
    promessa = carregarScript(FIREBASE_APP_SRC);
  }

  return promessa
    .then(() => {
      if (!firebase.auth) {
        return carregarScript(FIREBASE_AUTH_SRC);
      }
    })
    .then(() => {
      if (!firebase.apps || !firebase.apps.length) {
        return carregarScript("../js/firebase-init.js");
      }
    })
    .then(() => {
      if (!firebase.auth) {
        throw new Error("Firebase Auth nao foi carregado corretamente.");
      }
    });
}

const firebasePronto = carregarFirebaseAuth();

firebasePronto
  .then(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        window.location.href = "../html/home.html";
      }
    });
  })
  .catch(error => {
    console.error("Erro ao carregar Firebase:", error);
    alert("Nao foi possivel carregar o login. Tente novamente.");
  });

function onChangeEmail() {
  toggleButtonsDisable();
  toggleEmailErrors();
}

function onChangePassword() {
  toggleButtonsDisable();
  togglePasswordErrors();
}

function login() {
  showLoading();

  firebasePronto
    .then(() => firebase.auth().signInWithEmailAndPassword(
      form.email().value,
      form.password().value
    ))
    .then(() => {
      hideLoading();
      window.location.href = "../html/home.html";
    })
    .catch(error => {
      hideLoading();
      alert(getErrorMessage(error));
    });
}

function register() {
  window.location.href = "../html/register.html";
}

function recoverPassword() {
  const email = form.email().value;

  if (!email) {
    alert("Digite seu email primeiro");
    return;
  }

  showLoading();

  firebasePronto
    .then(() => firebase.auth().sendPasswordResetEmail(email))
    .then(() => {
      hideLoading();
      alert("Email de recuperacao enviado!");
    })
    .catch(error => {
      hideLoading();
      alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
  if (error.code === "auth/user-not-found") return "Usuario nao encontrado";
  if (error.code === "auth/wrong-password") return "Senha invalida";
  if (error.code === "auth/invalid-email") return "Email invalido";
  if (error.code === "auth/network-request-failed") return "Falha de conexao. Verifique sua internet.";
  return error.message;
}

function toggleEmailErrors() {
  const email = form.email().value;

  form.emailRequiredError().style.display = email ? "none" : "block";
  form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
  const password = form.password().value;
  form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
  const emailValid = isEmailValid();
  const passwordValid = isPasswordValid();

  form.recoverPasswordButton().disabled = !emailValid;
  form.loginButton().disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
  const email = form.email().value;
  return email ? validateEmail(email) : false;
}

function isPasswordValid() {
  return !!form.password().value;
}

const form = {
  email: () => document.getElementById("email"),
  emailInvalidError: () => document.getElementById("email-invalid-error"),
  emailRequiredError: () => document.getElementById("email-required-error"),
  loginButton: () => document.getElementById("login-button"),
  password: () => document.getElementById("password"),
  passwordRequiredError: () => document.getElementById("password-required-error"),
  recoverPasswordButton: () => document.getElementById("recover-password-button"),
};