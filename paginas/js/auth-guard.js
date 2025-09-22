firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "../html/index.html";
    }
})