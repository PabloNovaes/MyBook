import { User } from "../../../class/user.class.js";
import { setSidebarTooltips } from "./tippy.js";
import { openAndCloseFavorite } from "../../favorite/script.js";
import { openAndCloseBag } from "../../shoppingBag/script.js";
import { success } from "../../../sweetAlert/sweet.js";

const openFavoriteBtn = document.querySelector("#fav-btn");
const logoutBtn = document.querySelector(".logout-case");
const links = document.querySelectorAll(".nav-links li");
const loginBtn = document.querySelector(".login-case");
const openBagBtn = document.querySelector("#bag-btn");

function deleteCookie(nome) {
  document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

function verifyAuthState() {
  let cookies = document.cookie.split(";");
  cookies = cookies.filter((cookie) => cookie.includes("Auth"));

  const getCookie = { auth: cookies[0] };
  const cookie = getCookie.auth == undefined ? false : true;
  if (cookie) {
    return (
      loginBtn.classList.toggle("ocult-login"),
      logoutBtn.classList.toggle("view-logout")
    );
  }
}

links.forEach((li) => {
  li.addEventListener("click", () => {
    if (li.getAttribute("id") == "select-category") return
    setTimeout(() => {
      if (sidebar.classList.contains("open-nav")) {
        shadow.classList.toggle("viewShadow");
        sidebar.classList.remove("open-nav");
        document.body.classList.toggle("hidden");
      }
    }, 100);
  });
});

openFavoriteBtn.addEventListener("click", () => {
  if (window.innerWidth <= 664) {
    setTimeout(() => {
      openAndCloseFavorite();
    }, 300);
    return;
  }
  openAndCloseFavorite();
});

openBagBtn.addEventListener("click", () => {
  if (window.innerWidth <= 664) {
    setTimeout(() => {
      openAndCloseBag();
    }, 300);
    return;
  }
  openAndCloseBag();
});

logoutBtn.addEventListener("click", (e) => {
  const user = new User();

  setTimeout(() => {
    user.signOut(success, deleteCookie);

    setTimeout(() => {
      return (window.location.href = "/");
    }, 1000);
  }, 600);
});

setSidebarTooltips()
verifyAuthState()
