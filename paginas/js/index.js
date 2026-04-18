// REDIRECIONA SE JÁ ESTIVER LOGADO
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "../html/home.html";
    }
});

// ==========================
// EVENTOS DOS INPUTS
// ==========================
function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}

// ==========================
// LOGIN
// ==========================
function login() {
    showLoading();

    firebase.auth().signInWithEmailAndPassword(
        form.email().value,
        form.password().value
    )
    .then(() => {
        hideLoading();
        window.location.href = "../html/home.html";
    })
    .catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

// ==========================
// REGISTRO
// ==========================
function register() {
    window.location.href = "../html/register.html";
}

// ==========================
// RECUPERAR SENHA
// ==========================
function recoverPassword() {
    const email = form.email().value;

    if (!email) {
        alert("Digite seu email primeiro");
        return;
    }

    showLoading();

    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        hideLoading();
        alert("📧 Email de recuperação enviado!");
    })
    .catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

// ==========================
// TRATAMENTO DE ERROS
// ==========================
function getErrorMessage(error) {
    if (error.code === "auth/user-not-found") {
        return "Usuário não encontrado";
    }
    if (error.code === "auth/wrong-password") {
        return "Senha inválida";
    }
    if (error.code === "auth/invalid-email") {
        return "Email inválido";
    }
    return error.message;
}

// ==========================
// VALIDAÇÕES
// ==========================
function toggleEmailErrors() {
    const email = form.email().value;

    form.emailRequiredError().style.display =
        email ? "none" : "block";

    form.emailInvalidError().style.display =
        validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
    const password = form.password().value;

    form.passwordRequiredError().style.display =
        password ? "none" : "block";
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();

    form.recoverPasswordButton().disabled = !emailValid;
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
    const email = form.email().value;

    if (!email) return false;

    return validateEmail(email);
}

function isPasswordValid() {
    return form.password().value ? true : false;
}

// ==========================
// MAPEAMENTO DOS ELEMENTOS
// ==========================
const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPasswordButton: () => document.getElementById("recover-password-button"),
};