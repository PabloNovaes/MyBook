import "https://unpkg.com/@popperjs/core@2";
import "https://unpkg.com/tippy.js@6";

const selectCategory = document.querySelector("#select-category")
const controlls = document.querySelector("#controlls")
const categoryList = selectCategory.querySelector("div")
const links = categoryList.querySelectorAll("li")

function initCategorySidebar() {
  if (window.innerWidth < 820) return categoryList.classList.remove("categorys-fade-out")
  selectCategory.addEventListener("mouseover", () => {
    controlls.style.zIndex = -1
    categoryList.classList.remove("categorys-fade-out")
    categoryList.classList.add("categorys-fade-in")
  })

  links.forEach(link => {
    link.addEventListener("click", () => {
      controlls.style.zIndex = 0
      categoryList.classList.add("categorys-fade-out")
      categoryList.classList.remove("categorys-fade-in")
    })
  });

  window.addEventListener("click", () => {
    if (categoryList.classList.contains("categorys-fade-in")) {
      controlls.style.zIndex = 0
      categoryList.classList.add("categorys-fade-out")
      categoryList.classList.remove("categorys-fade-in")
      return
    }
  })

  categoryList.addEventListener("transitionend", () => categoryList.classList.remove("categorys-fade-out"))
}

export function setSidebarTooltips() {
  if (window.innerWidth > 820) {
    tippy("#home", {
      content: "Home",
      placement: "right",
      theme: "dark",
      animation: "shift-away",
      duration: 100,
    });

    tippy("#feed", {
      content: "Feed",
      placement: "right",
      theme: "dark",
      animation: "shift-away",
      duration: 100,
    });

    tippy("#profile", {
      content: "Perfil",
      placement: "right",
      theme: "dark",
      animation: "shift-away",
      duration: 100,
    });

    tippy("#chat", {
      content: "Chat",
      placement: "right",
      arrow: true,
      theme: "dark",
      animation: "shift-away",
      duration: 100,
    });

    tippy("#bag", {
      content: "Sacola de compras",
      placement: "right",
      theme: "dark",
      animation: "shift-away",
      duration: 100,
    });

    tippy("#fav", {
      content: "Favoritos",
      placement: "right",
      theme: "dark",
      animation: "shift-away",
      duration: 100,
    });

    tippy(".login-case", {
      content: "Entrar",
      placement: "right",
      theme: "dark",
      animation: "shift-away",
      duration: 100,
    });

    tippy(".logout-case", {
      content: "Sair",
      placement: "right",
      theme: "dark",
      animation: "shift-away",
      duration: 100,
    });
  }
}

initCategorySidebar()
