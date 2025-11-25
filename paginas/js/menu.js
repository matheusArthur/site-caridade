fetch("menu.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("menu").innerHTML = data;

    const mobileMenu = document.querySelector(".mobile-menu");
    const navList = document.querySelector(".nav-list");

    if (mobileMenu) {
      mobileMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        navList.classList.toggle("active");
      });
    }
  })
  .catch(error => console.log("Erro ao carregar o menu:", error));
