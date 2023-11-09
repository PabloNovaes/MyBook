import "https://unpkg.com/scrollreveal";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth, provider } from "../../services/firebase/auth.firebase.js";
import { User } from "../../class/user.class.js";
import { error } from "../../sweetAlert/sweet.js";
import { testEmail } from "../../regex/functions.js";

window.sr = ScrollReveal({ reset: true });

sr.reveal(".login--logo", {
  origin: "right",
  distance: "5rem",
  duration: 1200,
});

sr.reveal(".login--form--back", {
  origin: "right",
  distance: "5rem",
  duration: 1800,
});

const viewPasswordBtn = document.querySelector("#viewPassword");
const googleBtn = document.querySelector("#googleSignInBtn");
const inputPassword = document.querySelector("#password");
const googleLoader = document.querySelector("#c-loader");
const inputEmail = document.querySelector("#email");
const submitBtn = document.querySelector("button");
const loader = document.querySelector(".c-loader");
const html = document.querySelector("#html");
const theme = localStorage.getItem("theme");

if (theme) {
  html.classList.add(theme);
}

viewPasswordBtn.addEventListener("click", () => {
  inputPassword.type = inputPassword.type === "password" ? "text" : "password";
});

function displayErrorMessage(message, method = "simple") {
  if (method !== "simple") {
    googleLoader.style.display = "none";
    googleBtn.querySelector("img").style.display = "block";
    googleBtn.querySelector("p").style.display = "block";
  }
  submitBtn.querySelector("p").style.display = "block";
  loader.style.display = "none";

  return error(message);
}

async function loginWithEmailAndPassword(email, password, name, id, photoURL) {
  let method = "simple";

  if (!testEmail(email))
    return displayErrorMessage("Digite um email valido!", method);

  const user = new User(email, name, password, id, photoURL);

  try {
    const data = await user.singInWithEmailAndPassword(user);
    const response = await data;
    const message = response.status;

    localStorage.setItem("User", JSON.stringify(response.user));

    if (message !== "success") return displayErrorMessage(response.message);

    window.location.href = "/";
  } catch (err) {
    return displayErrorMessage(err, method);
  }
}

async function loginWithGoogle() {
  let method = "Google";

  try {
    const data = await signInWithPopup(auth, provider);
    const { email, displayName, uid, password, photoURL } = data.user;
    const user = new User(email, displayName, password, uid, photoURL);

    const response = await user.signInwithGoogle(user);
    localStorage.setItem("User", JSON.stringify(response.user));

    const message = response.status;
    if (message !== "success")
      return displayErrorMessage(response.message, method);

    window.location.href = "/";
  } catch (error) {
    displayErrorMessage(error, method);
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  submitBtn.querySelector("p").style.display = "none";
  loader.style.display = "block";

  const password = inputPassword.value;
  const email = inputEmail.value;
  const verifyValues = password !== "" && email !== "";

  if (!verifyValues) {
    let message = "Preencha todos os campos!";
    displayErrorMessage(message);
    return;
  }

  loginWithEmailAndPassword(email, password);
});

googleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  googleLoader.style.display = "block";
  googleBtn.querySelector("img").style.display = "none";
  googleBtn.querySelector("p").style.display = "none";

  loginWithGoogle();
});
