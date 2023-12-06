const openSidebarBtn = document.querySelector("#sidebar_btn")
const closeSidebarBtn = document.querySelector("#close-btn")
const toogleTheme = document.querySelector("#toogleTheme")
const sidebar = document.querySelector("#sidebar")
const shadow = document.querySelector("#shadow")
const html = document.querySelector("#html")
const theme = localStorage.getItem("theme")
const toggle = toogleTheme;

if (theme) {
  const toggle = toogleTheme;
  html.classList.add(theme);
  document.body.classList.add("not-transition");
  const currentTheme =
    theme == "light"
      ? toggle.classList.toggle("ph-sun")
      : toggle.classList.toggle("ph-moon");
}

window.addEventListener("scroll", () => {
  const header = document.querySelector("#main-header");
  if (window.scrollY > 120) {
    header.classList.add("header-shadow");
  } else {
    header.classList.remove("header-shadow");
  }
});

export const openAndCloseSidebar = () => {
  if (window.innerWidth < 820) {
    document.body.classList.toggle("hidden");
    sidebar.classList.toggle("open-nav");
    shadow.classList.toggle("viewShadow");
  }
};

const switchTheme = () => {
  toggle.classList.toggle("ph-sun");
  html.classList.toggle("light");
};

toogleTheme.addEventListener("click", () => {
  if (theme) {
    switchTheme();
    localStorage.removeItem("theme");
    return;
  }
  localStorage.setItem("theme", "light");
  switchTheme();
});



openSidebarBtn.addEventListener("click", openAndCloseSidebar);

closeSidebarBtn.addEventListener("click", openAndCloseSidebar);

