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

let authBusy = false;

function login() {
  if (authBusy || !isEmailValid() || !isPasswordValid()) return Promise.resolve();
  authBusy = true;
  toggleButtonsDisable();
  showLoading();

  return firebasePronto
    .then(() => firebase.auth().signInWithEmailAndPassword(
      form.email().value.trim(),
      form.password().value
    ))
    .then(() => {
      hideLoading();
      window.location.href = "../html/home.html";
    })
    .catch(error => {
      hideLoading();
      alert(getErrorMessage(error));
    })
    .finally(() => {
      authBusy = false;
      toggleButtonsDisable();
    });
}

function register() {
  window.location.href = "../html/register.html";
}

function recoverPassword() {
  if (authBusy) return Promise.resolve();
  const email = form.email().value.trim();

  if (!validateEmail(email)) {
    alert("Digite um e-mail válido primeiro.");
    return;
  }

  authBusy = true;
  toggleButtonsDisable();
  showLoading();

  return firebasePronto
    .then(() => firebase.auth().sendPasswordResetEmail(email))
    .then(() => {
      hideLoading();
      alert("Se houver uma conta para este e-mail, você receberá as instruções de recuperação. Confira também o spam.");
    })
    .catch(error => {
      hideLoading();
      alert(getErrorMessage(error));
    })
    .finally(() => {
      authBusy = false;
      toggleButtonsDisable();
    });
}

function getErrorMessage(error) {
  const messages = {
    "auth/user-not-found": "E-mail ou senha incorretos.",
    "auth/wrong-password": "E-mail ou senha incorretos.",
    "auth/invalid-credential": "E-mail ou senha incorretos.",
    "auth/invalid-login-credentials": "E-mail ou senha incorretos.",
    "auth/invalid-email": "Digite um e-mail válido.",
    "auth/too-many-requests": "Muitas tentativas. Aguarde um pouco e tente novamente.",
    "auth/user-disabled": "Esta conta está desativada. Entre em contato com o projeto.",
    "auth/network-request-failed": "Falha de conexão. Verifique sua internet.",
    "auth/operation-not-allowed": "O acesso por e-mail e senha está indisponível. Contate o projeto."
  };
  return messages[error.code] || "Não foi possível concluir. Tente novamente em instantes.";
}

function toggleEmailErrors() {
  const email = form.email().value.trim();

  form.emailRequiredError().style.display = email ? "none" : "block";
  form.emailInvalidError().style.display = !email || validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
  const password = form.password().value;
  form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
  const emailValid = isEmailValid();
  const passwordValid = isPasswordValid();

  form.recoverPasswordButton().disabled = authBusy || !emailValid;
  form.loginButton().disabled = authBusy || !emailValid || !passwordValid;
}

function isEmailValid() {
  const email = form.email().value.trim();
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
window.addEventListener("pageshow", toggleButtonsDisable);
document.getElementById("email").addEventListener("change", onChangeEmail);
document.getElementById("password").addEventListener("change", onChangePassword);
