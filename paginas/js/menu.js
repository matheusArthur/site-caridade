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

    // página ativa
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