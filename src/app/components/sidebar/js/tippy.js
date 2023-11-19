import "https://unpkg.com/@popperjs/core@2";
import "https://unpkg.com/tippy.js@6";

export function setSidebarTooltips() {
  if (window.innerWidth < 820) return;
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

  tippy("#category", {
    content: "Categorias",
    placement: "right",
    arrow: true,
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

