class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.dropdowns = document.querySelectorAll(".dropdown");
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
  }

  closeDropdowns(currentDropdown) {
    this.dropdowns.forEach((dropdown) => {
      if (dropdown !== currentDropdown) {
        dropdown.classList.remove("open");
      }
    });
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);

    this.dropdowns.forEach((dropdown) => {
      const button = dropdown.querySelector(".dropdown-toggle");
      button.addEventListener("click", () => {
        const isOpen = dropdown.classList.contains("open");
        this.closeDropdowns(dropdown);
        dropdown.classList.toggle("open", !isOpen);
      });
    });

    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.navList.classList.remove(this.activeClass);
        this.mobileMenu.classList.remove(this.activeClass);
        this.closeDropdowns(null);
      });
    });
  }

  init() {
    if (this.mobileMenu && this.navList) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list a",
);
mobileNavbar.init();
