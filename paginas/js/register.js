let registerBusy = false;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "../html/home.html";
    }
})

function onChangeEmail() {
    const email = form.email().value.trim();
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = !email || validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = !password || password.length >= 6 ? "none" : "block";

    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function register() {
    if (registerBusy || !isFormValid()) return Promise.resolve();
    registerBusy = true;
    toggleRegisterButtonDisable();
    showLoading();

    const email = form.email().value.trim();
    const password = form.password().value;
    return firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {
        hideLoading();
        window.location.href = "../html/home.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    }).finally(() => {
        registerBusy = false;
        toggleRegisterButtonDisable();
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    if (error.code === "auth/network-request-failed") return "Falha de conexão. Verifique sua internet.";
    if (error.code === "auth/weak-password") return "A senha não atende à política de segurança do projeto.";
    if (error.code === "auth/too-many-requests") return "Muitas tentativas. Aguarde e tente novamente.";
    return "Não foi possível criar a conta. Confira os dados e tente novamente.";
}

function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = registerBusy || !isFormValid();
}

function isFormValid() {
    const email = form.email().value.trim();
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button')
}
if (typeof window.addEventListener === "function") window.addEventListener("pageshow", toggleRegisterButtonDisable);
