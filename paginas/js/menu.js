// Carregar o menu automaticamente
fetch("../html/menu.html")
  .then(r => r.text())
  .then(html => {
    document.getElementById("menu").innerHTML = html;

    // Ativar menu mobile
    const mobileMenu = document.querySelector(".mobile-menu");
    const navList = document.querySelector(".nav-list");

    if (mobileMenu) {
      mobileMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        navList.classList.toggle("active");
      });
    }
  })
  .catch(err => console.error("Erro ao carregar o menu:", err));


// FUNÇÃO LOGOUT (se ainda não existir)
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}
