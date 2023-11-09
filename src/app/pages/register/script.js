import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth, provider } from "../../services/firebase/auth.firebase.js";
import { User } from "../../class/user.class.js";
import {
  testEmail,
  testPassword,
  verifyPassword,
} from "../../regex/functions.js";
import "https://unpkg.com/scrollreveal";
import { success, error } from "../../sweetAlert/sweet.js";

const viewPasswordBtn = document.querySelector("#viewPassword");
const googleBtn = document.querySelector("#googleSignInBtn");
const inputLastName = document.querySelector("#last-name");
const inputPassword = document.querySelector("#password");
const googleLoader = document.querySelector("#c-loader");
const inputEmail = document.querySelector("#email");
const loader = document.querySelector(".c-loader");
const submitBtn = document.querySelector("button");
const inputName = document.querySelector("#name");
const html = document.querySelector("#html");
const theme = localStorage.getItem("theme");
const caracter = document.querySelector("#especial-caracter");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");

if (theme) {
  html.classList.add(theme);
}

viewPasswordBtn.addEventListener("click", () => {
  inputPassword.type = inputPassword.type === "password" ? "text" : "password";
});

export function displayErrorMessage(message, method = "simple") {
  if (method !== "simple") {
    googleLoader.style.display = "none";
    googleBtn.querySelector("img").style.display = "block";
    googleBtn.querySelector("p").style.display = "block";
  }
  submitBtn.querySelector("p").style.display = "block";
  loader.style.display = "none";

  return error(message);
}

export function displaySuccessMessage(message) {
  submitBtn.querySelector("p").style.display = "block";
  loader.style.display = "none";
  success(message);
}

async function createAccount(email, password, name, lastName) {
  let method;
  submitBtn.querySelector("p").style.display = "none";
  loader.style.display = "block";

  const fullName = `${name} ${lastName}`;

  const user = new User(email, fullName, password);
  user.avatar_url = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjk5OTcgMjJDOC4wNDU0OCAyMiA1LjE4MjQ0IDIyIDMuMzIzNyAxOS40NTQ1QzEuNDY0OTUgMTYuOTA5MSA4LjA0NTUxIDE1IDExLjk5OTcgMTVDMTUuOTUzOSAxNSAyMi41MzU0IDE2LjkwOTEgMjAuNjc2MiAxOS40NTQ1QzE4LjgxNjkgMjEuOTk5OSAxNS45NTM4IDIyIDExLjk5OTcgMjJaIiBmaWxsPSIjQTI3OUZGIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNSIgZmlsbD0iI0EyNzlGRiIvPgo8L3N2Zz4K`;

  try {
    const response = await user.registerWithEmailAndPassword(user);
    const message = response.status;

    if (message !== "success")
      return displayErrorMessage(response.message, method);

    displaySuccessMessage(response.message);
    window.location.href = "/login";
  } catch (err) {
    return displayErrorMessage(err);
  } finally {
    submitBtn.querySelector("p").style.display = "flex";
    loader.style.display = "none";
  }
}

async function createAccountWithGoogle() {
  googleBtn.querySelector("img").style.display = "none";
  googleBtn.querySelector("p").style.display = "none";
  googleLoader.style.display = "block";

  const data = await signInWithPopup(auth, provider);

  const { email, displayName, uid, password, photoURL } = data.user;
  const user = new User(email, displayName, password, uid, photoURL);

  try {
    const response = await user.registerWithGoogle(user);
    const message = response.status;

    if (message !== "success") return displayErrorMessage(response.message);

    displaySuccessMessage(response.message);
    window.location.href = "/login";
  } catch (err) {
    displayErrorMessage(err);
  } finally {
    googleLoader.style.display = "none";
    googleBtn.querySelector("img").style.display = "block";
    googleBtn.querySelector("p").style.display = "block";
  }
}

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const inputValues = [
    inputEmail.value,
    inputPassword.value,
    inputName.value,
    inputLastName.value,
  ];

  const isEmpty = inputValues.some((value) => value == "");

  if (isEmpty) return displayErrorMessage("Preencha todos os campos!");

  if (!testEmail(inputValues[0]))
    return displayErrorMessage("Digite um email válido!");

  if (!testPassword(inputValues[1]))
    return displayErrorMessage("A senha não atende aos critérios");

  await createAccount(
    inputValues[0],
    inputValues[1],
    inputValues[2],
    inputValues[3]
  );
});

googleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createAccountWithGoogle();
});

inputPassword.addEventListener("keyup", () => {
  const passwordTest = document.querySelectorAll(".password-validate");

  passwordTest.forEach((item) => {
    item.classList.add("view-test");
  });

  verifyPassword(inputPassword.value, caracter, lowercase, uppercase);
});

window.sr = ScrollReveal({ reset: true });

sr.reveal(".login--form--back", {
  origin: "right",
  distance: "5rem",
  duration: 1800,
});
