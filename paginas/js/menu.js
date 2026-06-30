// ../js/menu.js

function carregarScript(src) {
  return new Promise((resolve, reject) => {
    const scriptExistente = document.querySelector(`script[src="${src}"]`);

    if (scriptExistente) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function carregarFirebaseAuth() {
  const versaoFirebase = window.firebase && firebase.SDK_VERSION;
  const versao8 = versaoFirebase && versaoFirebase.startsWith("8.");

  let promessa = Promise.resolve();

  if (!window.firebase) {
    promessa = carregarScript("https://www.gstatic.com/firebasejs/9.6.7/firebase-app-compat.js");
  }

  return promessa
    .then(() => {
      if (firebase.auth) return;

      const authSrc = versao8
        ? "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"
        : "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth-compat.js";

      return carregarScript(authSrc);
    })
    .then(() => {
      if (!firebase.apps || !firebase.apps.length) {
        return carregarScript("../js/firebase-init.js");
      }
    });
}

window.logout = function () {
  carregarFirebaseAuth()
    .then(() => firebase.auth().signOut())
    .then(() => {
      window.location.href = "../html/index.html";
    })
    .catch(error => {
      console.error("Erro ao sair:", error);
      alert("Erro ao sair. Tente novamente.");
    });
};

fetch("menu.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("menu").innerHTML = data;

    const mobileMenu = document.querySelector(".mobile-menu");
    const navList = document.querySelector(".nav-list");

    if (mobileMenu && navList) {
      mobileMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        navList.classList.toggle("active");
      });
    }

    // destacar página ativa
    const links = document.querySelectorAll(".nav-list a");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
      const linkPage = link.getAttribute("href").split("/").pop();
      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    });
  })
  .catch(err => console.error("Erro ao carregar menu:", err));