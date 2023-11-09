export const pageLoader = {
  startLoader() {
    const loader = document.querySelector("#loader-page");
    loader.style.display = "grid";
    loader.classList.add("fade-in");
  },
  stopLoader() {
    const loader = document.querySelector("#loader-page");
    loader.classList.remove("fade-in");
    loader.classList.add("fade-out");
    loader.style.display = "none";
  },
};
